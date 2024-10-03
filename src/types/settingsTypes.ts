export interface ISettingsBank {
  id: number;
  iban: string;
  title: string;
  name: string;
  accountNumber: string;
}

export interface ISettingsStore {
  storeName: string;
  storeSlug: string;
  storeTypes: any[];
}

export interface ISettingsProfile {
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  cnic?: string;
  // password: string;
}
