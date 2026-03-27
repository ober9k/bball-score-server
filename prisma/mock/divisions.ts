import type { MockTeam } from "./teams";
import { mockTeams } from "./teams";

export type MockDivision = {
  name: string,
  teams: MockTeam[],
};

export const mockDivisions: MockDivision[] = [
  { name: "Division 1", teams: [ ...mockTeams ] },
  { name: "Division 2", teams: [] }, /* empty for now */
];
