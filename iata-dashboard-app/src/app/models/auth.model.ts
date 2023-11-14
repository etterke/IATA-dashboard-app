export interface UserDetailsResponse {
  id: number;
  password: string;
  username: string;
}

export interface UserDetailPayload {
  username: string;
  password: string;
}
