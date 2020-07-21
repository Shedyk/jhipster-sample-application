export interface ICounty {
  id?: number;
  countyName?: string;
}

export class County implements ICounty {
  constructor(public id?: number, public countyName?: string) {}
}
