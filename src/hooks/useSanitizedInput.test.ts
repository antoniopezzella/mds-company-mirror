import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useSanitizedInput, useSanitizedEmail } from './useSanitizedInput';

describe('useSanitizedInput', () => {
  it('initialises with an empty string by default', () => {
    const { result } = renderHook(() => useSanitizedInput());
    expect(result.current.value).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('initialises with a provided initial value', () => {
    const { result } = renderHook(() => useSanitizedInput('hello'));
    expect(result.current.value).toBe('hello');
  });

  it('sanitizes input on handleChange', () => {
    const { result } = renderHook(() => useSanitizedInput());
    act(() => {
      result.current.handleChange('<script>alert(1)</script>');
    });
    expect(result.current.value).not.toContain('<script>');
  });

  it('clears error when handleChange is called', () => {
    const { result } = renderHook(() => useSanitizedInput());
    act(() => {
      result.current.validate(() => 'Forced error');
    });
    expect(result.current.error).toBe('Forced error');
    act(() => {
      result.current.handleChange('clean text');
    });
    expect(result.current.error).toBeNull();
  });

  it('validate returns true when no validator is provided', () => {
    const { result } = renderHook(() => useSanitizedInput('anything'));
    let valid: boolean = false;
    act(() => {
      valid = result.current.validate();
    });
    expect(valid).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('validate returns true and clears error when validator returns true', () => {
    const { result } = renderHook(() => useSanitizedInput('ok'));
    let valid: boolean = false;
    act(() => {
      valid = result.current.validate(() => true);
    });
    expect(valid).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('validate returns false and sets error when validator returns false', () => {
    const { result } = renderHook(() => useSanitizedInput('bad'));
    let valid: boolean = true;
    act(() => {
      valid = result.current.validate(() => false);
    });
    expect(valid).toBe(false);
    expect(result.current.error).toBe('Invalid input');
  });

  it('validate returns false and sets string error message when validator returns a string', () => {
    const { result } = renderHook(() => useSanitizedInput('x'));
    let valid: boolean = true;
    act(() => {
      valid = result.current.validate(() => 'Too short');
    });
    expect(valid).toBe(false);
    expect(result.current.error).toBe('Too short');
  });

  it('reset restores the initial value and clears error', () => {
    const { result } = renderHook(() => useSanitizedInput('initial'));
    act(() => {
      result.current.handleChange('changed value');
      result.current.validate(() => 'Some error');
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBe('initial');
    expect(result.current.error).toBeNull();
  });

  it('setValue directly updates the value', () => {
    const { result } = renderHook(() => useSanitizedInput(''));
    act(() => {
      result.current.setValue('direct update');
    });
    expect(result.current.value).toBe('direct update');
  });
});

describe('useSanitizedEmail', () => {
  it('initialises with an empty string by default', () => {
    const { result } = renderHook(() => useSanitizedEmail());
    expect(result.current.value).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('validate returns false and sets required error when value is empty', () => {
    const { result } = renderHook(() => useSanitizedEmail());
    let valid: boolean = true;
    act(() => {
      valid = result.current.validate();
    });
    expect(valid).toBe(false);
    expect(result.current.error).toBe('Email is required');
  });

  it('validate returns false and sets format error for an invalid email', () => {
    const { result } = renderHook(() => useSanitizedEmail('not-an-email'));
    let valid: boolean = true;
    act(() => {
      valid = result.current.validate();
    });
    expect(valid).toBe(false);
    expect(result.current.error).toBe('Invalid email format');
  });

  it('validate returns true for a valid email address', () => {
    const { result } = renderHook(() => useSanitizedEmail('user@example.com'));
    let valid: boolean = false;
    act(() => {
      valid = result.current.validate();
    });
    expect(valid).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('reset clears the email back to the initial value', () => {
    const { result } = renderHook(() => useSanitizedEmail('start@example.com'));
    act(() => {
      result.current.handleChange('changed@example.com');
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBe('start@example.com');
  });
});
