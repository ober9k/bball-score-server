export type Season = {
  id: number,
  name: string,
  active: boolean,
  archived: boolean,
  leagueId: number,
};

export type SeasonData = Omit<Season, "id">;
