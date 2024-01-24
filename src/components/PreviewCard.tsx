import React from 'react';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PreviewCardWrapper = styled(Card)`
  position: relative;
  border-radius: 0;
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: none;
`;

const PreviewCardContent = styled(CardContent)`
  width: 100%;
  height: 60px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.8);
  display: block;

  &:last-child {
    padding-bottom: 8px;
  }
`;

const CaptionTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
`;

interface PreviewCardProp {
  image: any;
  title: string;
  handleOpenDetail: any;
}
export default function PreviewCard(props: PreviewCardProp) {
  const { image, title, handleOpenDetail } = props;

  return (
    <PreviewCardWrapper>
      <CardMedia
        style={{ cursor: 'pointer' }}
        component='img'
        width='100%'
        height='140px'
        image={image}
        onClick={handleOpenDetail}
      />
      <PreviewCardContent>
        <CaptionTypography
          variant='caption'
          display='block'
          gutterBottom
          onClick={handleOpenDetail}
        >
          {title}
        </CaptionTypography>
      </PreviewCardContent>
    </PreviewCardWrapper>
  );
}
