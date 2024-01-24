import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const UserWrapper = styled.div`
  display: flex;
  justtify-content: center;
  align-items: center;
`;

const Username = styled(Typography)`
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  margin-left: 8px;
  font-weight: bold;
`;

interface IUserInfoProps {
  avatar: string;
  name: string;
}

export default function UserInfo(props: IUserInfoProps) {
  const { avatar, name } = props;

  return (
    <UserWrapper>
      <Avatar alt={name} src={avatar} sx={{ width: 32, height: 32 }} />
      <Username variant='h4'>{name}</Username>
    </UserWrapper>
  );
}
