export interface IAppContext {
  state: IState;
  updateState: (value: IState) => void;
}

export interface IState {
  contacts?: IContact[];
}

export type IUpdateState = {contacts?: IContact[]};

export interface IContact {
  id: number;
  name: string;
  email: string;
  telephone: string;
  houseNumber?: string;
  postcode: string;
  addressLine1: string;
  addressLine2?: string;
  town?: string;
  county: string;
}

export interface IPostcodeLookup {
  data: {
    addresses: [{
      line_1: string;
      locality: string;
      town_or_city: string;
      county: string;
    }]
  }
}