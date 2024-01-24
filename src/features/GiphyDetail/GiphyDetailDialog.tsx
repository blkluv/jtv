import React, { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
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
import DetailCard from 'components/DetailCard';
import Loader from 'components/Loader';
import { STATUSES } from 'utils/config';
import { useGiphyDetail } from './modules/giphyDetail.hook';

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

interface IGiphyDetailDialogProp {
  isOpen: boolean;
  id: string | null;
  toggleOpen: any;
}

export default function GiphyDetailDialog(props: IGiphyDetailDialogProp) {
  const { id, isOpen, toggleOpen } = props;
  const { selectors, actions } = useGiphyDetail();

  const detail = useAppSelector(selectors.detail);
  const status = useAppSelector(selectors.status);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    toggleOpen(false);
  }, []);

  useEffect(() => {
    id && dispatch(actions.fetchGiphyDetailAsync({ id }));
  }, [id]);

  return (
    <>
      <BootstrapDialog
        maxWidth='lg'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={isOpen}
      >
        <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
          <CaptionTypography>{detail.title}</CaptionTypography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {status == STATUSES.loading && (
            <Loader style={{ minWidth: '400px', minHeight: '320px' }} />
          )}
          {status != STATUSES.loading && (
            <DetailCard
              user={detail.user}
              title={detail.username}
              rating={detail.rating}
              image={detail.images?.downsized?.url}
            />
          )}
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
