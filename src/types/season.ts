export type Season = {
  id: number,
  name: string,
  leagueId: number,
};

export type NewSeason = Omit<Season, "id">;
