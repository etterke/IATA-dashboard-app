export interface UserDetailsResponse {
  id: number;
  password: string;
  username: string;
}

export interface UserDetailPayload extends Omit<UserDetailsResponse, 'id'> {}
