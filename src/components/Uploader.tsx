import React, { useEffect } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import { UPLOADER_SETTING } from 'utils/config';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

const uppy = new Uppy({
  restrictions: {
    maxFileSize: UPLOADER_SETTING.MAX_FILE_SIZE,
    maxNumberOfFiles: UPLOADER_SETTING.MAX_NUMBER_OF_FILES,
    allowedFileTypes: UPLOADER_SETTING.ALLOWED_FILE_TYPES,
  },
});

export default function Uploader() {
  useEffect(() => {
    uppy.on('file-added', (file: any) => {
      console.log('file added: \n', file);
    });

    uppy.on('restriction-failed', (file, error) => {
      console.log('file added: \n', { file, error });
    });

    uppy.on('error', (error) => {
      console.error(error.stack);
    });
  }, []);

  return <Dashboard uppy={uppy} />;
}
