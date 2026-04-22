export type Team = {
  id:         number,
  name:       string,
  shortName:  string,
  divisionId: number,
  active:     boolean,
  archived:   boolean,
  leagueId:   number,
};

export type TeamData = Omit<Team, "id">;
