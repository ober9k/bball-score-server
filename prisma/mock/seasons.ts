import type { MockDivision } from "./divisions";
import { mockDivisions } from "./divisions";

export type MockSeason = {
  name: string,
  divisions: MockDivision[],
};

export const mockSeasons: MockSeason[] = [
  { name: "Season 1", divisions: [ ...mockDivisions ] }];
