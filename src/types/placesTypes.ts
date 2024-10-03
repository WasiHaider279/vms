export interface ICountryPayload {
  id?: number;
  _id?: string;
  name?: string;
  code?: string;
  longitude?: number;
  latitude?: number;
  limit?: number;
  sort?: any;
  "sort[name]"?: number;
}

export interface ICityPayload {
  id?: number;
  _id?: string;
  name?: string;
  code?: string;
  longitude?: number;
  latitude?: number;
  limit?: number;
  sort?: string[] | number;
  country?: string;
  "sort[name]"?: number;
}
