import { Button } from '@/components/ui/button';

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="primary" destructive>
        Delete
      </Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" loading>
        Saving
      </Button>
    </div>
  );
}
