import axios from 'axios';
import { IPostcodeLookup } from '../interfaces';

export const getAddressFromPostcode = (postcode: string, houseNumber?: string): Promise<IPostcodeLookup> => {
  return axios.get(`https://api.getAddress.io/find/${postcode}${ houseNumber ? '/' + houseNumber : ''}?api-key=BH6nIKSOo0-Ecj6h5apRYA35044&expand=true`);
}