import React from 'react';
import {
  DataGrid as MuiDataGrid,
  type DataGridProps,
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material';
import { getRoleColor } from '../../theme/roles';

export type { GridColDef, GridRowsProp, GridRowId } from '@mui/x-data-grid';

export interface MDSDataGridProps extends Omit<DataGridProps, 'sx'> {
  /** Override or extend the MDS default sx overrides */
  sx?: DataGridProps['sx'];
}

/**
 * MDSDataGrid
 *
 * Thin, themed wrapper around `@mui/x-data-grid` that applies MDS role-based
 * colours, border, and typography — so every table in the platform shares the
 * same visual language without repeating sx overrides.
 *
 * All standard DataGrid props are forwarded; pass `sx` to extend or override
 * the MDS defaults per-instance.
 *
 * @example
 * ```tsx
 * import { MDSDataGrid } from 'components/DataGrid';
 * import type { GridColDef } from 'components/DataGrid';
 *
 * const columns: GridColDef[] = [
 *   { field: 'id',   headerName: 'ID',   width: 80 },
 *   { field: 'name', headerName: 'Name', flex: 1 },
 * ];
 *
 * <MDSDataGrid rows={rows} columns={columns} />
 * ```
 */
export const MDSDataGrid: React.FC<MDSDataGridProps> = ({ sx, ...props }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <MuiDataGrid
      {...props}
      sx={[
        {
          // Container
          border: `1px solid ${getRoleColor('border.default', { mode })}`,
          borderRadius: '8px',
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: '0.875rem',
          color: getRoleColor('fg.primary', { mode }),
          backgroundColor: getRoleColor('bg.default', { mode }),

          // Column headers
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: getRoleColor('bg.neutral.subtle', { mode }),
            color: getRoleColor('fg.primary', { mode }),
            borderBottom: `2px solid ${getRoleColor('border.default', { mode })}`,
          },
          '& .MuiDataGrid-columnHeader': {
            fontWeight: 600,
            fontSize: '0.8125rem',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          },
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
            outline: `2px solid ${getRoleColor('interactive.primary', { mode })}`,
            outlineOffset: '-2px',
          },
          '& .MuiDataGrid-sortIcon': {
            color: getRoleColor('interactive.primary', { mode }),
          },
          '& .MuiDataGrid-menuIconButton': {
            color: getRoleColor('fg.neutral.subtle', { mode }),
          },

          // Rows
          '& .MuiDataGrid-row': {
            borderBottom: `1px solid ${getRoleColor('border.default', { mode })}`,
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: `${getRoleColor('interactive.primary', { mode })}0d`, // ~5% opacity
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: `${getRoleColor('interactive.primary', { mode })}1a`, // ~10% opacity
            '&:hover': {
              backgroundColor: `${getRoleColor('interactive.primary', { mode })}26`, // ~15% opacity
            },
          },

          // Cells
          '& .MuiDataGrid-cell': {
            borderRight: 'none',
            color: getRoleColor('fg.primary', { mode }),
          },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: `2px solid ${getRoleColor('interactive.primary', { mode })}`,
            outlineOffset: '-2px',
          },

          // Column separator
          '& .MuiDataGrid-columnSeparator': {
            color: getRoleColor('border.default', { mode }),
          },

          // Checkbox — mirrors src/components/ui/checkbox.tsx's own
          // convention: unchecked border is Active Blue (interactive.secondary),
          // checked/indeterminate fill is brand Midnight Blue (interactive.primary).
          // Previously both states used interactive.secondary, so every checked
          // row rendered in the wrong (brighter, pre-refresh) blue.
          '& .MuiCheckbox-root': {
            color: getRoleColor('interactive.secondary', { mode }),
            '&.Mui-checked': {
              color: getRoleColor('interactive.primary', { mode }),
            },
            '&.MuiCheckbox-indeterminate': {
              color: getRoleColor('interactive.primary', { mode }),
            },
          },

          // Pagination footer
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${getRoleColor('border.default', { mode })}`,
            backgroundColor: getRoleColor('bg.neutral.subtle', { mode }),
          },
          '& .MuiTablePagination-root': {
            color: getRoleColor('fg.neutral.subtle', { mode }),
          },
          '& .MuiTablePagination-selectIcon': {
            color: getRoleColor('fg.neutral.subtle', { mode }),
          },
          '& .MuiIconButton-root': {
            color: getRoleColor('interactive.primary', { mode }),
            '&.Mui-disabled': {
              color: getRoleColor('fg.disabled', { mode }),
            },
          },

          // Loading overlay
          '& .MuiDataGrid-loadingOverlay': {
            backgroundColor: `${getRoleColor('bg.default', { mode })}cc`,
          },
        },
        // Allow per-instance sx overrides
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    />
  );
};
