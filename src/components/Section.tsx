import React from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';

const SectionContainer = styled(Container)`
  padding: 16px;
`;

interface SectionProp {
  style?: object;
  children?: any;
}

export default function Section(props: SectionProp) {
  const { style, children } = props;
  return (
    <SectionContainer style={style} maxWidth={false}>
      {children}
    </SectionContainer>
  );
}
