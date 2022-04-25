export interface IAppContext {
  state: IState;
  updateState: (value: IState) => void;
}

export interface IState {
  contacts?: IContact[];
}

export type IUpdateState = {contacts?: IContact[]};

export interface IContact {
  id: number | string;
  name: string;
  email: string;
  telephone: string;
  addressLine1: string;
  addressLine2?: string;
  town?: string;
  county: string;
  postcode: string;
}