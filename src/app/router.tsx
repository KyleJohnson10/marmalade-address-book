import { Router } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Homepage } from './homepage';

export const AppRouter: FunctionComponent = () => {

  return (
    <>
      <Router>
        <Homepage path="/" />
      </Router>
    </>
  );
};
