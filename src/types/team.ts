export type Team = {
  id: number,
  name: string,
  shortName: string,
  leagueId: number,
  divisionId: number,
};

export type NewTeam = Omit<Team, "id">;
