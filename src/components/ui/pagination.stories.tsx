import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './pagination';

/**
 * # Pagination
 *
 * Radix-free, `getRoleColor()`-driven counterpart to the MUI `Pagination`.
 * Same `currentPage`/`totalItems`/`pageSize`/`pageSizeOptions`/`variant`/
 * `onPageChange`/`onPageSizeChange` API as the MUI twin, including the
 * page-size selector and jump-to-page input in `variant="advanced"`.
 */
const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: { control: 'select', options: ['simple', 'advanced'] },
    itemLabel: {
      control: 'text',
      description: 'Word appended after the total count, auto-pluralized. Pass \'\' for MUI TablePagination\'s bare "1–5 of 8" convention.',
    },
    rowsLabel: {
      control: 'text',
      description: 'Label before the page-size selector — pass "Rows per page:" to match MUI\'s wording.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Advanced: StoryObj = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <Pagination
        currentPage={page}
        totalItems={237}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const Simple: StoryObj = {
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination currentPage={page} totalItems={237} pageSize={10} variant="simple" onPageChange={setPage} />;
  },
};

export const FewPages: StoryObj = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalItems={35} pageSize={10} onPageChange={setPage} />;
  },
};

export const ManyPages: StoryObj = {
  render: () => {
    const [page, setPage] = useState(42);
    return <Pagination currentPage={page} totalItems={5000} pageSize={10} onPageChange={setPage} onPageSizeChange={() => {}} />;
  },
};

export const Disabled: Story = {
  args: {
    currentPage: 2,
    totalItems: 100,
    pageSize: 10,
    onPageChange: () => {},
    disabled: true,
  },
};

export const NoItemsInfo: Story = {
  args: {
    currentPage: 1,
    totalItems: 100,
    pageSize: 10,
    onPageChange: () => {},
    showItemsRange: false,
    showTotalItems: false,
  },
};
