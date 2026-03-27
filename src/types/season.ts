export type Season = {
  id: number,
  name: string,
  leagueId: number,
};

export type SeasonData = Omit<Season, "id">;
