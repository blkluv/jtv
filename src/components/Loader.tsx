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
interface ILoaderProps {
  style?: any;
}

export default function Loader(props: ILoaderProps) {
  const { style } = props;
  return (
    <LoaderWrapper style={style}>
      <CircularProgress color='inherit' />
    </LoaderWrapper>
  );
}
