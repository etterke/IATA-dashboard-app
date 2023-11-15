import { UserDetailsResponse } from '../models/auth.model';

export const findExistingUser = (
  username: string,
  password: string,
  users: UserDetailsResponse[]
): boolean => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};
