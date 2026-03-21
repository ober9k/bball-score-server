import type { Role } from "./user/role";

export type User = {
  id: number,
  email: string,
  password: string,
  role: Role,
};

export type NewUser = Omit<User, "id">;
