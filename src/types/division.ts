import type { Season } from "./season";

export type Division = {
  id: number,
  name: string,
};

export type NewDivision = Omit<Division, "id">;
