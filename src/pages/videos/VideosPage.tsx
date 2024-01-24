import React from 'react';
import Container from '@mui/material/Container';
import PageContent from 'components/PageContent';
import { GiphyTrendy } from 'features/GiphyTrendy';
import { GIPHY_DATA_TYPES } from 'utils/config';

function VideosPage() {
  return (
    <PageContent>
      <Container>
        <GiphyTrendy type={GIPHY_DATA_TYPES.video} />
      </Container>
    </PageContent>
  );
}

export default VideosPage;
