import { useState } from 'react';
import './App.scss';
import { AppContext, DefaultState } from './store/AppContext';
import { IState } from './store/interfaces';
import { AppRouter } from '../src/app/router';
import { Header } from '../src/components/header';

function App() {
  const [state, setState] = useState<IState>(DefaultState);

  const updateState = (value: IState): void => {
    const updatedState = { ...state, ...value };
    setState(updatedState);
  };
  return (
    <AppContext.Provider
      value={{
        state: state,
        updateState: updateState,
      }}>
      <Header />
      <AppRouter />
    </AppContext.Provider>
  );
}

export default App;
