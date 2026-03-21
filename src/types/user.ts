import type { RoleType } from "./user/role";

export type User = {
  id: number,
  email: string,
  password: string,
  role: RoleType,
};

export type NewUser = Omit<User, "id">;
