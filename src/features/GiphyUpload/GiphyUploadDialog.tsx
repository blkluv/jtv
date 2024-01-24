import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Uploader from 'components/Uploader';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

const BootstrapActions = styled(DialogActions)`
  display: flex;
  justify-content: center;
`;

const BootstrapButton = styled(Button)`
  min-width: 100px;
`;

const CaptionTypography = styled(Typography)`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export interface IDialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: IDialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface IGiphyUploadDialogProp {
  isOpen: boolean;
  toggleOpen: any;
}

export default function GiphyUploadDialog(props: IGiphyUploadDialogProp) {
  const { isOpen, toggleOpen } = props;

  const handleClose = () => {
    toggleOpen(false);
  };

  return (
    <>
      <BootstrapDialog
        maxWidth='lg'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={isOpen}
      >
        <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
          <CaptionTypography>{'Upload Your Gif'}</CaptionTypography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Uploader />
        </DialogContent>
        <BootstrapActions>
          <BootstrapButton variant='contained' onClick={handleClose}>
            Close
          </BootstrapButton>
        </BootstrapActions>
      </BootstrapDialog>
    </>
  );
}
