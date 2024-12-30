export enum Role {
  COSTUMER = "costumer",
  ADMIN = "admin",
}

export interface IUGetUser {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  role: Role;
  sex?: string;
  email_verified: boolean;
  identity_card: string;
  nationality: string;
  date_joined: string;
  is_active: boolean;
  preferred_language: string;
  has_completed_profile: boolean;
}

export interface IUUserMostRentals {
  count: number;
  next?: string;
  previous?: string;
  current_page: number;
  page_size: number;
  results: IUGetUser[];
}

export interface IUUser {
  token: string;
  user: IUGetUser;
}

export interface IUcodeEmail {
  verification_code: string;
}
