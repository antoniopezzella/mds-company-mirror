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

export type ModalSize = 'Small' | 'Medium' | 'Large' | 'FullScreen';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasScrollbar?: boolean;
  size?: ModalSize;
  title?: string;
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
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {hasHeader && (
        <DialogTitle id="modal-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent dividers={hasHeader}>
        {children}
      </DialogContent>
      {hasFooter && footer && (
        <DialogActions sx={{ p: 2 }}>
          {footer}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
