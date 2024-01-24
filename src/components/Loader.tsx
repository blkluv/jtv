import React from 'react';
import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 32px;
  width: 100%;
  color: #fff;
`;
interface LoaderProp {
  style?: any;
}

export default function Loader(props: LoaderProp) {
  const { style } = props;
  return (
    <LoaderWrapper style={style}>
      <CircularProgress color='inherit' />
    </LoaderWrapper>
  );
}
