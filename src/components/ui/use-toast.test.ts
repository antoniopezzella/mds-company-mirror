import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { useToast, toast } from './use-toast';

/**
 * The toast queue.
 *
 * Picked out of 59 untested modules because it is one of the few that is real
 * logic rather than a wrapper: a reducer, a timeout map and a module-level
 * listener array, at 32% statements and 14% functions. Everything it can get
 * wrong — a leaked timeout, a leaked listener, a queue that grows without
 * bound — is invisible until it is a memory problem in a long-lived tab.
 *
 * State is MODULE-level, deliberately, so `toast()` is callable from anywhere
 * without a provider. That also means every test has to leave it clean, which
 * the afterEach below does.
 */

const drain = async (result: { current: ReturnType<typeof useToast> }) => {
  act(() => result.current.dismiss());
  // The reducer queues removal on a 1s timer; run it out rather than waiting.
  await act(async () => {
    vi.runAllTimers();
  });
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(async () => {
  const { result, unmount } = renderHook(() => useToast());
  await drain(result);
  unmount();
  vi.useRealTimers();
});

describe('adding', () => {
  it('shows a toast and returns handles to it', () => {
    const { result } = renderHook(() => useToast());
    let handle: ReturnType<typeof toast> | undefined;
    act(() => {
      handle = result.current.toast({ title: 'Saved' });
    });
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({ title: 'Saved', open: true });
    expect(handle).toMatchObject({ id: expect.any(String) });
  });

  it('puts the newest first, because that is the one being read', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'first' });
      result.current.toast({ title: 'second' });
    });
    expect(result.current.toasts.map((t) => t.title)).toEqual(['second', 'first']);
  });

  it('CAPS the queue rather than growing without bound', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      for (let i = 0; i < 9; i += 1) result.current.toast({ title: `t${i}` });
    });
    // A background job firing a toast per failure would otherwise accumulate
    // one DOM node per failure for the life of the tab.
    expect(result.current.toasts).toHaveLength(5);
    expect(result.current.toasts[0].title).toBe('t8');
  });

  it('gives every toast a distinct id', () => {
    const { result } = renderHook(() => useToast());
    const ids: string[] = [];
    act(() => {
      for (let i = 0; i < 4; i += 1) ids.push(result.current.toast({ title: 'x' }).id);
    });
    expect(new Set(ids).size).toBe(4);
  });
});

describe('updating', () => {
  it('changes one toast in place, leaving its siblings alone', () => {
    const { result } = renderHook(() => useToast());
    let handle: ReturnType<typeof toast> | undefined;
    act(() => {
      result.current.toast({ title: 'other' });
      handle = result.current.toast({ title: 'uploading' });
    });
    act(() => handle!.update({ id: handle!.id, title: 'uploaded' }));

    expect(result.current.toasts.map((t) => t.title)).toEqual(['uploaded', 'other']);
  });

  it('BINDS to its own toast — an id passed in is overridden, not honoured', () => {
    const { result } = renderHook(() => useToast());
    let mine: ReturnType<typeof toast> | undefined;
    act(() => {
      result.current.toast({ title: 'someone else' });
      mine = result.current.toast({ title: 'mine' });
    });
    act(() => mine!.update({ id: 'someone-elses-id', title: 'updated' } as never));

    // `update` spreads its own id LAST, so a caller cannot retarget another
    // toast by passing one — worth pinning, because the signature accepts an
    // `id` and looks as though it would be used.
    expect(result.current.toasts.map((t) => t.title)).toEqual(['updated', 'someone else']);
  });
});

describe('dismissing', () => {
  it('closes the toast BEFORE removing it, so the exit animation can run', () => {
    const { result } = renderHook(() => useToast());
    let handle: ReturnType<typeof toast> | undefined;
    act(() => {
      handle = result.current.toast({ title: 'Saved' });
    });
    act(() => handle!.dismiss());

    // Still present, marked closed — removing it here would cut the animation.
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].open).toBe(false);
  });

  it('removes it once the close delay has elapsed', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'Saved' });
    });
    act(() => result.current.dismiss());
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it('dismisses every toast when given no id', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'a' });
      result.current.toast({ title: 'b' });
    });
    act(() => result.current.dismiss());
    expect(result.current.toasts.every((t) => t.open === false)).toBe(true);
  });

  it('dismisses only the named one when given an id', () => {
    const { result } = renderHook(() => useToast());
    let keep: ReturnType<typeof toast> | undefined;
    act(() => {
      keep = result.current.toast({ title: 'keep' });
      result.current.toast({ title: 'close' });
    });
    act(() => result.current.dismiss(result.current.toasts[0].id));

    const byTitle = Object.fromEntries(result.current.toasts.map((t) => [t.title, t.open]));
    expect(byTitle).toEqual({ close: false, keep: true });
    expect(keep).toBeDefined();
  });

  it('does not queue a second removal for a toast dismissed twice', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'a' });
    });
    const id = result.current.toasts[0].id;
    act(() => {
      result.current.dismiss(id);
      result.current.dismiss(id);
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    // Two timers for one toast is the shape of a leak, even when the second
    // is harmless today.
    expect(vi.getTimerCount()).toBe(0);
    expect(result.current.toasts).toHaveLength(0);
  });

  it('closes itself when Radix reports the toast closed', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'Saved' });
    });
    // The swipe-to-dismiss and timeout paths both arrive as onOpenChange.
    act(() => result.current.toasts[0].onOpenChange?.(false));
    expect(result.current.toasts[0].open).toBe(false);
  });

  it('ignores onOpenChange(true), which is not a dismissal', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: 'Saved' });
    });
    act(() => result.current.toasts[0].onOpenChange?.(true));
    expect(result.current.toasts[0].open).toBe(true);
  });
});

describe('subscription lifecycle', () => {
  it('delivers to every mounted consumer', () => {
    const a = renderHook(() => useToast());
    const b = renderHook(() => useToast());
    act(() => {
      a.result.current.toast({ title: 'shared' });
    });
    expect(b.result.current.toasts.map((t) => t.title)).toEqual(['shared']);
    a.unmount();
    b.unmount();
  });

  it('UNSUBSCRIBES on unmount rather than leaking a listener', () => {
    let renders = 0;
    const first = renderHook(() => {
      renders += 1;
      return useToast();
    });
    first.unmount();
    const afterUnmount = renders;

    const second = renderHook(() => useToast());
    act(() => {
      second.result.current.toast({ title: 'after unmount' });
    });
    // Dispatch is synchronous, so a surviving listener would have re-rendered
    // the unmounted hook by now. Every mount/unmount cycle leaving one behind
    // is how a long-lived app ends up dispatching to hundreds of dead
    // setState functions.
    expect(renders).toBe(afterUnmount);
    second.unmount();
  });

  it('a newly mounted consumer sees the toasts already queued', () => {
    const a = renderHook(() => useToast());
    act(() => {
      a.result.current.toast({ title: 'earlier' });
    });
    const b = renderHook(() => useToast());
    expect(b.result.current.toasts.map((t) => t.title)).toEqual(['earlier']);
    a.unmount();
    b.unmount();
  });
});
