import React, { FunctionComponent } from 'react';
import { Container } from 'styled-bootstrap-grid';
import styled from 'styled-components';

const LogoContainer = styled.div`
  width: 236px;
  padding: 15px 0;

  img {
    width: 100%;
  }
`;

export const Header: FunctionComponent = () => {
  return (
    <Container style={{ borderBottom: '1px solid #dadada' }}>
      <LogoContainer>
        <img
          alt="logo"
          src="https://www.wearemarmalade.co.uk/static/marmalade_mlogo-7f92cef2618695253cfb8a2a494930b7.svg"
        />
      </LogoContainer>
    </Container>
  );
};
