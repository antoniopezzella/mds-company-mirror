import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WorkspaceCard from './WorkspaceCard';

describe('WorkspaceCard', () => {
  it('renders title, description, category and CTA', () => {
    render(
      <WorkspaceCard
        title="Workspace for global risk operations"
        description="A modern workspace built for Marsh One teams to collaborate on risk intelligence."
        category="Workspace"
        imageSrc="/images/workspace-card.jpg"
        imageAlt="Workspace dashboard"
        ctaLabel="Open workspace"
        ctaHref="/workspaces/global-risk"
        badges={['AI-enabled', 'Secure']}
        footerNote="Built for Marsh One teams."
      />
    );

    expect(screen.getByRole('heading', { name: /workspace for global risk operations/i })).toBeInTheDocument();
    expect(screen.getByText(/a modern workspace built for marsh one teams/i)).toBeInTheDocument();
    expect(screen.getByText(/^Workspace$/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open workspace/i })).toHaveAttribute('href', '/workspaces/global-risk');
    expect(screen.getByText(/^AI-enabled$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Secure$/i)).toBeInTheDocument();
  });

  it('renders a watermark category pill when category is provided', () => {
    render(
      <WorkspaceCard
        title="Workspace with category"
        imageSrc="/images/workspace-card.jpg"
        category="Workspace"
      />
    );

    expect(screen.getByText(/^Workspace$/i)).toBeInTheDocument();
  });

  it('renders a button element when ctaHref is omitted', () => {
    render(
      <WorkspaceCard
        title="Workspace action"
        imageSrc="/images/workspace-card.jpg"
        onCtaClick={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /explore workspace/i })).toBeInTheDocument();
  });
});
