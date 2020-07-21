import { ICountry } from 'app/shared/model/country.model';

export interface ICounty {
  id?: number;
  countyName?: string;
  country?: ICountry;
}

export class County implements ICounty {
  constructor(public id?: number, public countyName?: string, public country?: ICountry) {}
}
