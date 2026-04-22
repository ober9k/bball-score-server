export type Division = {
  id:       number,
  name:     string,
  seasonId: number,
  active:   boolean,
  archived: boolean,
  leagueId: number,
};

export type DivisionData = Omit<Division, "id">;
