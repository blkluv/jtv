import React from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';

const SectionContainer = styled(Container)`
  padding: 16px;
`;

interface ISectionProps {
  style?: object;
  children?: any;
}

export default function Section(props: ISectionProps) {
  const { style, children } = props;
  return (
    <SectionContainer style={style} maxWidth={false}>
      {children}
    </SectionContainer>
  );
}
