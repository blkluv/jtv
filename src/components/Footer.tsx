import React from 'react';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Section from 'components/Section';
import { FOOTER_MENU } from 'utils/config';

const FooterLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 128px;
`;

interface FooterLinksProp {
  items: { id: string; title: string; link: string }[];
}
const FooterLinks = (props: FooterLinksProp) => {
  const { items } = props;

  return (
    <>
      {items?.map((linkItem) => (
        <FooterLink key={linkItem.id} href={linkItem.link}>
          {linkItem.title}
        </FooterLink>
      ))}
    </>
  );
};

export default function Footer() {
  const theme = useTheme();

  return (
    <Section style={{ backgroundColor: theme.palette?.background?.footer }}>
      <Container maxWidth='lg'>
        <FooterContent>
          <FooterLinks items={FOOTER_MENU} />
        </FooterContent>
      </Container>
    </Section>
  );
}
