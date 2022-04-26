import { createContext } from 'react';
import { IState, IAppContext } from './interfaces';

export const DefaultState: IState = {
  contacts: [
    {
      id: 1,
      name: "Kyle Johnson",
      email: "Test1@yopmail.com",
      telephone: "01390 876365",
      addressLine1: "1 Test Road",
      addressLine2: "Flitch Way",
      town: "Dunmow",
      county: "Essex",
      postcode: "LE15 7JN",
    },
    {
      id: 2,
      name: "Steve Smith",
      email: "Test2@yopmail.com",
      telephone: "01390 876365",
      addressLine1: "1 Test Road",
      addressLine2: "Flitch Way",
      town: "Dunmow",
      county: "Essex",
      postcode: "LE15 7JN",
    },
    {
      id: 3,
      name: "Ben Stokes",
      email: "Test3@yopmail.com",
      telephone: "01390 876365",
      addressLine1: "1 Test Road",
      addressLine2: "Flitch Way",
      town: "Dunmow",
      county: "Essex",
      postcode: "LE15 7JN",
    }
  ]
}

export const AppContext = createContext<IAppContext>({
  state: DefaultState,
  updateState: () => null,
});