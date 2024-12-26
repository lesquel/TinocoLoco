export enum Role {
  COSTUMER = "costumer",
  ADMIN = "admin",
}
export interface IUUser {
  token: string,
  user: {
    id: number,
    username: string,
    email: string,
    first_name?: string,
    last_name?: string,
    full_name?: string,
    role?: Role,
    sex?: string,
    email_verified: boolean,
    identity_card: string,
    nacionality: string,
    date_joined: string,
    is_active: boolean,
    preferred_language: string,
    has_completed_profile: boolean,
  }
}

