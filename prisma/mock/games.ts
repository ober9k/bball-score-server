import type { GamePhaseType } from "@/types/game/game-phase";
import type { GameTeamSideType } from "@/types/game/game-team-side";

export const mapStats = (stats: number[]) => {
  const [
    seconds,
    fgMade,
    fgAttempted,
    fg3Made,
    fg3Attempted,
    ftMade,
    ftAttempted,
    points,
    offRebounds,
    defRebounds,
    rebounds,
    assists,
    steals,
    blocks,
    turnovers,
    personalFouls,
    technicalFouls,
  ] = stats;

  return {
    seconds,
    fgMade,
    fgAttempted,
    fg3Made,
    fg3Attempted,
    ftMade,
    ftAttempted,
    points: fgMade * 2 + fg3Made + fgMade,
    offRebounds,
    defRebounds,
    rebounds: offRebounds + defRebounds,
    assists,
    steals,
    blocks,
    turnovers,
    personalFouls,
    technicalFouls,
  }
};

export type MockGameTeamPlayer = {
  playerId:       number,
  started:        boolean,
  seconds:        number,
  fgMade:         number,
  fgAttempted:    number,
  fg3Made:        number,
  fg3Attempted:   number,
  ftMade:         number,
  ftAttempted:    number,
  points:         number,
  offRebounds:    number,
  defRebounds:    number,
  rebounds:       number,
  assists:        number,
  steals:         number,
  blocks:         number,
  turnovers:      number,
  personalFouls:  number,
  technicalFouls: number,
};

export type MockGameTeam = {
  teamId: number,
  side: GameTeamSideType,
  score: number,
  scoreByPeriod: number[],
  teamPlayers: MockGameTeamPlayer[],
};

export type MockGame = {
  date:       Date,
  phase:      GamePhaseType,
  round:      number,
  gameTeams:  MockGameTeam[],
};

export const mockGameTeams: MockGameTeam[] = [
  { teamId: 1, side: "AWAY_TEAM", score: 50, scoreByPeriod: [13,12,11,14], teamPlayers: [
      { playerId:  1, started: true,  ...mapStats([ 1664, 5, 12, 0, 2, 0, 0, 0, 5, 1, 0, 3, 1, 0, 4, 2, 0]) },
      { playerId:  2, started: true,  ...mapStats([ 1667, 2, 10, 1, 8, 0, 1, 0, 1, 2, 0, 1, 0, 0, 1, 2, 0]) },
      { playerId:  3, started: true,  ...mapStats([ 1194, 0,  4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]) },
      { playerId:  4, started: true,  ...mapStats([ 1257, 4, 11, 0, 3, 0, 0, 0, 1, 4, 0, 3, 4, 0, 3, 1, 0]) },
      { playerId:  5, started: true,  ...mapStats([ 2400, 6, 16, 1, 6, 2, 2, 0, 2, 7, 0, 2, 3, 0, 3, 3, 0]) },
      { playerId:  6, started: false, ...mapStats([ 2088, 4,  8, 0, 3, 0, 0, 0, 4, 2, 0, 2, 4, 1, 1, 2, 0]) },
      { playerId:  7, started: false, ...mapStats([ 1730, 2,  6, 0, 0, 0, 0, 0, 1, 4, 0, 2, 0, 0, 0, 1, 0]) },
      { playerId:  8, started: false, ...mapStats([    0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
    ] },
  { teamId: 2, side: "HOME_TEAM", score: 49, scoreByPeriod: [15,11,10,13], teamPlayers: [
      { playerId:  9, started: true,  ...mapStats([ 1850, 8, 16, 3, 7, 0, 1, 0, 1, 0, 0, 1, 3, 0, 2, 1, 0]) },
      { playerId: 10, started: true,  ...mapStats([ 1422, 0,  6, 0, 6, 0, 0, 0, 0, 2, 0, 1, 0, 0, 2, 1, 0]) },
      { playerId: 11, started: true,  ...mapStats([ 1824, 2,  7, 2, 4, 2, 2, 0, 0, 3, 0, 2, 1, 0, 1, 1, 0]) },
      { playerId: 12, started: true,  ...mapStats([ 2252, 4, 13, 2, 7, 3, 4, 0, 2, 4, 0, 7, 4, 0, 2, 0, 0]) },
      { playerId: 13, started: true,  ...mapStats([ 1830, 1,  8, 1, 6, 0, 0, 0, 3, 5, 0, 1, 1, 0, 0, 0, 0]) },
      { playerId: 14, started: false, ...mapStats([ 1854, 0,  3, 0, 0, 0, 0, 0, 2, 4, 0, 1, 0, 0, 0, 4, 0]) },
      { playerId: 15, started: false, ...mapStats([  968, 1,  3, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 5, 0]) },
      { playerId: 16, started: false, ...mapStats([    0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
    ] },
  { teamId: 1, side: "AWAY_TEAM", score: 56, scoreByPeriod: [], teamPlayers: [
      { playerId:  1, started: true,  ...mapStats([ 1421, 8, 13, 2, 5, 0, 1, 0, 4, 0, 0, 0, 2, 0, 0, 2, 0]) },
      { playerId:  2, started: true,  ...mapStats([ 1453, 2,  8, 1, 5, 2, 3, 0, 0, 3, 0, 2, 0, 1, 2, 3, 0]) },
      { playerId:  3, started: true,  ...mapStats([ 1646, 1,  5, 0, 0, 0, 2, 0, 2, 5, 0, 1, 1, 0, 2, 4, 0]) },
      { playerId:  4, started: true,  ...mapStats([ 1823, 0,  5, 0, 5, 0, 0, 0, 0, 1, 0, 1, 2, 1, 0, 1, 0]) },
      { playerId:  5, started: true,  ...mapStats([ 1627, 6, 15, 3, 7, 0, 0, 0, 1, 0, 0, 4, 5, 0, 2, 3, 0]) },
      { playerId:  6, started: false, ...mapStats([ 1467, 0,  0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 3, 1, 0]) },
      { playerId:  7, started: false, ...mapStats([ 1314, 2,  9, 1, 3, 0, 0, 0, 1, 3, 0, 2, 3, 0, 0, 1, 0]) },
      { playerId:  8, started: false, ...mapStats([ 1259, 4, 10, 0, 0, 1, 3, 0, 3, 7, 0, 0, 0, 0, 0, 0, 0]) },
    ] },
  { teamId: 3, side: "HOME_TEAM", score: 51, scoreByPeriod: [], teamPlayers: [
      { playerId: 17, started: true,  ...mapStats([ 2183, 4,  7, 2, 4, 1, 2, 0, 3, 2, 0, 3, 2, 0, 3, 3, 0]) },
      { playerId: 18, started: true,  ...mapStats([ 1565, 1,  4, 1, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0]) },
      { playerId: 19, started: true,  ...mapStats([    0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
      { playerId: 20, started: true,  ...mapStats([  713, 1,  5, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) },
      { playerId: 21, started: true,  ...mapStats([ 2188, 4, 14, 1, 6, 0, 0, 0, 1, 5, 0, 2, 2, 2, 3, 1, 0]) },
      { playerId: 22, started: false, ...mapStats([ 1899, 6, 13, 3, 8, 2, 4, 0, 0, 5, 0, 3, 3, 1, 2, 3, 0]) },
      { playerId: 23, started: false, ...mapStats([ 1796, 2,  5, 0, 2, 0, 0, 0, 3, 0, 0, 3, 4, 0, 1, 1, 0]) },
      { playerId: 24, started: false, ...mapStats([ 1656, 2,  5, 0, 0, 0, 0, 0, 1, 2, 0, 0, 1, 0, 1, 4, 0]) },
    ] },
  { teamId: 2, side: "AWAY_TEAM", score: 44, scoreByPeriod: [], teamPlayers: [
      { playerId:  9, started: true,  ...mapStats([ 1676, 2,  6, 1, 4, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0, 0]) },
      { playerId: 10, started: true,  ...mapStats([  810, 0,  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0]) },
      { playerId: 11, started: true,  ...mapStats([ 1771, 9, 20, 1, 6, 1, 4, 0, 2, 3, 0, 4, 2, 0, 2, 1, 0]) },
      { playerId: 12, started: true,  ...mapStats([ 1676, 2,  9, 1, 5, 0, 0, 0, 0, 2, 0, 3, 2, 0, 2, 0, 0]) },
      { playerId: 13, started: true,  ...mapStats([ 1736, 3,  8, 1, 4, 0, 0, 0, 0, 4, 0, 1, 3, 0, 3, 1, 0]) },
      { playerId: 14, started: false, ...mapStats([ 1732, 3,  5, 0, 0, 0, 0, 0, 2, 1, 0, 2, 1, 1, 0, 0, 0]) },
      { playerId: 15, started: false, ...mapStats([ 1258, 0,  2, 0, 0, 1, 2, 0, 5, 3, 0, 0, 0, 0, 1, 2, 0]) },
      { playerId: 16, started: false, ...mapStats([ 1341, 0,  0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 0, 3, 4, 0]) },
    ] },
  { teamId: 3, side: "HOME_TEAM", score: 50, scoreByPeriod: [], teamPlayers: [
      { playerId: 17, started: true,  ...mapStats([ 1612, 3, 11, 0, 7, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0]) },
      { playerId: 18, started: true,  ...mapStats([ 1129, 1,  5, 0, 2, 0, 0, 0, 2, 3, 0, 1, 1, 0, 1, 1, 0]) },
      { playerId: 19, started: true,  ...mapStats([ 2266, 3,  9, 0, 1, 3, 4, 0, 4, 3, 0, 9, 2, 0, 3, 2, 0]) },
      { playerId: 20, started: true,  ...mapStats([ 1401, 0,  3, 0, 1, 0, 0, 0, 0, 5, 0, 3, 0, 0, 1, 1, 0]) },
      { playerId: 21, started: true,  ...mapStats([ 1939, 6, 15, 1, 6, 3, 4, 0, 3, 3, 0, 3, 2, 0, 3, 1, 0]) },
      { playerId: 22, started: false, ...mapStats([ 1249, 3,  5, 1, 2, 0, 0, 0, 1, 2, 0, 0, 2, 0, 0, 0, 0]) },
      { playerId: 23, started: false, ...mapStats([  486, 0,  4, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 2, 1, 0]) },
      { playerId: 24, started: false, ...mapStats([ 1918, 4, 10, 0, 0, 1, 1, 0, 0, 3, 0, 0, 0, 1, 1, 2, 0]) },
    ] },
];

export const mockGames: MockGame[] = [
  { date: new Date("2026-02-01"), phase: "REGULAR_SEASON", round: 1, gameTeams: [ ...mockGameTeams.slice(0, 2) ] },
  { date: new Date("2026-02-08"), phase: "REGULAR_SEASON", round: 2, gameTeams: [ ...mockGameTeams.slice(2, 4) ] },
  { date: new Date("2026-02-15"), phase: "REGULAR_SEASON", round: 3, gameTeams: [ ...mockGameTeams.slice(4, 6) ] },
];

