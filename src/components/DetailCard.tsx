import React from 'react';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import UserInfo from 'components/UserInfo';
import Rating from 'components/Rating';

const DetailCardWrapper = styled(Card)`
  position: relative;
  border-radius: 0;
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: none;
  min-width: 400px;
  min-height: 320px;
  padding-bottom: 80px;
  transition: all linear 0.2s;
`;

const DetailCardContent = styled(CardContent)`
  width: 100%;
  padding: 16px 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all linear 0.2s;

  &:last-child {
    padding-bottom: 16px;
  }
`;

interface IDetailCardProps {
  image: any;
  title: string;
  user: any;
  rating: string;
}
export default function DetailCard(props: IDetailCardProps) {
  const { image, user, rating } = props;

  return (
    <DetailCardWrapper>
      <CardMedia
        style={{ padding: '16px', minHeight: '200px' }}
        component='img'
        width='100%'
        height='auto'
        image={image}
      />
      <DetailCardContent>
        <UserInfo avatar={user?.avatar_url} name={user?.display_name} />
        <Rating value={rating} />
      </DetailCardContent>
    </DetailCardWrapper>
  );
}
