enum Role {
  COSTUMER = "costumer",
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
    sex?: string
  }
}