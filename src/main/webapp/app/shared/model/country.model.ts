import { ICounty } from 'app/shared/model/county.model';

export interface ICountry {
  id?: number;
  countryName?: string;
  country?: ICounty;
}

export class Country implements ICountry {
  constructor(public id?: number, public countryName?: string, public country?: ICounty) {}
}
