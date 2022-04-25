import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Line = styled.div`
  background-color: rgb(233, 81, 30);
  width: 70px;
  height: 5px;
  display: block;
  margin: 10px auto;
  border-radius: 2.5px;
`;

export const Indicator: FunctionComponent = () => {
  return <Line />;
};
