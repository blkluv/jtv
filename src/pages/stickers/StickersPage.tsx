import React from 'react';
import Container from '@mui/material/Container';
import PageContent from 'components/PageContent';
import { GiphyTrendy } from 'features/GiphyTrendy';
import { GIPHY_DATA_TYPES } from 'utils/config';

function StickersPage() {
  return (
    <PageContent>
      <Container>
        <GiphyTrendy type={GIPHY_DATA_TYPES.sticker} />
      </Container>
    </PageContent>
  );
}

export default StickersPage;
