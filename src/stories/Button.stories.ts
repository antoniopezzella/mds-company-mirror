// Legacy Example/Button stories placeholder.
// This file is retained temporarily to avoid hard failures while refining globs.
// It is excluded from Storybook indexing by updated globs in .storybook/main.ts.
// Safe to delete in a follow-up commit.
import type { Meta } from '@storybook/react';

const meta: Meta = {
	title: '__deprecated__/ExampleButton',
	parameters: {
		docs: { disable: true },
		chromatic: { disableSnapshot: true },
	},
	tags: ['hidden'],
};
export default meta;

// No stories exported intentionally.
