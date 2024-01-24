import React from 'react';
import styled from '@emotion/styled';
import { RATING_TYPES } from 'utils/config';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarRateIcon from '@mui/icons-material/StarRate';
import EightteenMpIcon from '@mui/icons-material/EightteenMp';
import ThirteenMpIcon from '@mui/icons-material/ThirteenMp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

const RatingTitle = styled(Typography)`
  color: #fff;
  text-transform: uppercase;
  margin-right: 8px;
`;

const RatingName = styled(Typography)`
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  margin-right: 8px;
`;

const RatingWrapper = styled.div`
  display: flex;
  justtify-content: center;
  align-items: center;
`;

const getIconByRating = (rating: string) => {
  switch (rating) {
    case RATING_TYPES.y:
      return <ThumbUpIcon />;

    case RATING_TYPES.g:
      return <ThumbDownIcon />;

    case RATING_TYPES.pg:
      return <ThumbsUpDownIcon />;

    case RATING_TYPES.pg13:
      return <ThirteenMpIcon />;

    case RATING_TYPES.r:
      return <EightteenMpIcon />;

    default:
      return <StarRateIcon />;
  }
};

interface RatingProp {
  value: string;
}

export default function Rating(props: RatingProp) {
  const { value } = props;

  return (
    <RatingWrapper>
      <IconButton
        aria-label={value}
        sx={{
          color: (theme) => theme.palette.primary.main,
        }}
      >
        <RatingTitle>{'Rating:'} </RatingTitle>
        <RatingName variant='h5'>{value}</RatingName>
        {getIconByRating(value)}
      </IconButton>
    </RatingWrapper>
  );
}
