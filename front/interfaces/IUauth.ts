import { IUUser } from "./IUser";

export interface IURegister {
  username: string;
  email: string;
  password: string;
}

export interface IULogin {
  username: string;
  password: string;
}

export interface IUGetUsers {
  count: number;
  next?: string;
  previous?: string;
  current_page: number;
  page_size: number;
  results: IUUser[];
}

export interface IUSendPasswordResetCode {
  code: string;
  new_password: string;
}