export type Team = {
  id: number,
  name: string,
  shortName: string,
  active: boolean,
  archived: boolean,
  leagueId: number,
  divisionId: number,
};

export type TeamData = Omit<Team, "id">;
