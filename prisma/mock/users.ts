import type { NewUser } from "@/types/user";
import { Role } from "@/types/user/role";

export const mockUsers: Array<NewUser> = [
  { email: "john.smith@example.com", password: "john.smith.2026", role: Role.ADMINISTRATOR },
  { email: "jane.smith@example.com", password: "jane.smith.2026", role: Role.MANAGER },
  { email: "josh.smith@example.com", password: "josh.smith.2026", role: Role.USER },
];
