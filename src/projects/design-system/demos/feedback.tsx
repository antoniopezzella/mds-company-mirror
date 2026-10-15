import * as React from 'react';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Tooltip } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { LinearProgress, CircularProgress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Alert severity="success" title="Policy renewed">
        Your policy has been renewed through next year.
      </Alert>
      <Alert severity="warning" title="Payment due soon">
        Your next payment is due in 5 days.
      </Alert>
      <Alert severity="error" title="Claim rejected">
        This claim is missing required documentation.
      </Alert>
      <Alert severity="info" outlined>
        Cyber coverage is now available as an add-on.
      </Alert>
    </div>
  );
}

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          toast({ title: 'Policy saved', description: 'Your changes were saved successfully.', tone: 'success' })
        }
      >
        Show success toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ title: 'Something went wrong', description: 'Could not save your changes.', tone: 'danger' })}
      >
        Show error toast
      </Button>
    </div>
  );
}

export function TooltipDemo() {
  return (
    <div className="flex flex-wrap gap-6">
      <Tooltip title="Coverage details">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
      <Tooltip title="This action cannot be undone" tone="danger">
        <Button variant="tertiary">Danger tooltip</Button>
      </Tooltip>
    </div>
  );
}

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel policy</DialogTitle>
          <DialogDescription>This will cancel your policy at the end of the current billing period.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="tertiary">Keep policy</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary" destructive>
              Cancel policy
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ProgressDemo() {
  const [value, setValue] = React.useState(40);
  return (
    <div className="flex flex-col items-start gap-6">
      <div className="w-full max-w-sm">
        <LinearProgress value={value} />
      </div>
      <div className="flex items-center gap-4">
        <CircularProgress variant="determinate" value={value} />
        <CircularProgress variant="indeterminate" tone="success" />
        <Button variant="tertiary" onClick={() => setValue((v) => (v >= 100 ? 0 : v + 20))}>
          Advance
        </Button>
      </div>
    </div>
  );
}

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  );
}
