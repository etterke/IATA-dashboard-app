export interface UserDetailsResponse {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserDetailPayload {
  username: string;
  password: string;
}
