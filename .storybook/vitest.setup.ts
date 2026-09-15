// Wires this project's Storybook preview (decorators, parameters, globalTypes
// — see preview.tsx) into the Vitest "storybook" project defined in
// vitest.config.ts, so stories run as real tests get the same MUI theme
// wrapper, RoleVarsProvider, etc. as they do inside Storybook itself.
import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react';
import * as previewAnnotations from './preview';

const project = setProjectAnnotations([previewAnnotations]);

beforeAll(project.beforeAll);
