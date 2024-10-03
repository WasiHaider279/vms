export interface IUserFormData  {
    name: string;
    email: string;
    password: string;
    permissions: {
      module: string;
      read: boolean;
      write: boolean;
      update: boolean;
      delete: boolean;
    }[];
  };