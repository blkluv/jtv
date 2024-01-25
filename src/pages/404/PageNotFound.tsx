import React from 'react';
import styled from '@emotion/styled';
import PageContent from 'components/PageContent';

const Title = styled.h4`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 0px;
`;

const HelpText = styled.p`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  margin-top: 8px;
`;

const PageNotFoundWrapper = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function PageNotFound() {
  return (
    <PageContent>
      <PageNotFoundWrapper>
        <Title>Page not found</Title>
        <HelpText>
          Your request is not ready for now, back to homepage <a href='/'>here</a>
        </HelpText>
      </PageNotFoundWrapper>
    </PageContent>
  );
}

export default PageNotFound;
