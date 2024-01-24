import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UploadIcon from '@mui/icons-material/Upload';
import GiphyUploadDialog from './GiphyUploadDialog';

const UploadButton = styled(Button)`
  min-width: 100px;
`;

export default function GiphyUploadButton() {
  const [isOpenUploader, setIsOpenUploader] = useState<boolean>(false);

  const openUploader = () => {
    setIsOpenUploader(true);
  };

  return (
    <>
      <UploadButton variant='contained' startIcon={<UploadIcon />} onClick={openUploader}>
        <Typography variant='caption'>{'Upload'}</Typography>
      </UploadButton>
      <GiphyUploadDialog isOpen={isOpenUploader} toggleOpen={setIsOpenUploader} />
    </>
  );
}
