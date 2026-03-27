import type { MockSeason } from "./seasons";
import { mockSeasons } from "./seasons";

export type MockLeague = {
  name: string,
  slug: string,
  seasons: MockSeason[],
};

export const mockLeagues: MockLeague[] = [
  { name: "Outer Sydney Basketball League", slug: "outer-sbl", seasons: [ ...mockSeasons ] },
  { name: "Trash Ass Basketball League",    slug: "trash-bl",  seasons: [] }, /* empty for now */
];
