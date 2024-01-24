import React from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';

const ContentContainer = styled(Container)`
  padding: 0;
  min-height: calc(100vh - 200px);
`;

interface PageContentProp {
  style?: object;
  children?: any;
}

export default function PageContent(props: PageContentProp) {
  const { style, children } = props;
  return (
    <ContentContainer disableGutters={true} style={style} maxWidth={false}>
      {children}
    </ContentContainer>
  );
}
