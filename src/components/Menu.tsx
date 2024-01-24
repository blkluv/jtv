import React from 'react';
import styled from '@emotion/styled';
import Link from '@mui/material/Link';

const MenuWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MenuItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 24px;
  color: #ffffff;
  text-decoration: none;

  img {
    margin-right: 8px;
  }
`;

const MenuIcon = styled.span`
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MenuProp {
  items: { title: string; link: string; id: string; icon: any }[];
}

export default function Menu(props: MenuProp) {
  const { items } = props;

  const MenuLinks = items?.map((item) => (
    <MenuItem key={item.id} href={item.link}>
      <MenuIcon>
        <item.icon />
      </MenuIcon>
      {item.title}
    </MenuItem>
  ));

  return <MenuWrapper>{MenuLinks}</MenuWrapper>;
}
