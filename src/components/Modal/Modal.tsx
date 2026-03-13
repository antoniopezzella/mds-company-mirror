import React from 'react';
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getRoleColor } from '../../theme/roles';

export type ModalSize = 'Small' | 'Medium' | 'Large' | 'FullScreen';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasScrollbar?: boolean;
  size?: ModalSize;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const sizeMap: Record<ModalSize, 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false> = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  FullScreen: false, // Special handling for fullscreen
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  hasHeader = true,
  hasFooter = true,
  hasScrollbar = true,
  size = 'Medium',
  title,
  description,
  children,
  footer,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={size === 'FullScreen'}
      maxWidth={sizeMap[size]}
      fullWidth
      scroll={hasScrollbar ? 'paper' : 'body'}
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      {hasHeader && (
        <DialogTitle
          id="modal-title"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: (theme) => theme.spacing(3),
            color: getRoleColor('text.primary'),
          }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: getRoleColor('text.secondary'),
              '&:hover': {
                color: getRoleColor('interactive.primary.hover'),
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent
        dividers={hasHeader}
        sx={{
          p: (theme) => theme.spacing(3),
          ...(description && { pt: 0 }), // Adjust padding if description is present as a hidden label
        }}
      >
        {description && (
          <Typography id="modal-description" sx={{ display: 'none' }}>
            {description}
          </Typography>
        )}
        {children}
      </DialogContent>
      {hasFooter && footer && (
        <DialogActions sx={{ p: (theme) => theme.spacing(2), px: (theme) => theme.spacing(3) }}>
          {footer}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
