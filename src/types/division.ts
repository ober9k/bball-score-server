export type Division = {
  id: number,
  name: string,
  leagueId: number,
  seasonId: number,
};

export type DivisionData = Omit<Division, "id">;
