export type Team = {
  id: number,
  name: string,
  shortName: string,
  leagueId: number,
  divisionId: number,
};

export type TeamData = Omit<Team, "id">;
