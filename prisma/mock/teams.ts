import { mockPlayers } from "./players";
import type { MockPlayer } from "./players";

export type MockTeam = {
  name: string,
  shortName: string,
  players: MockPlayer[],
};

export const mockTeams: MockTeam[] = [
  { name: "Campbelltown Carabaos", shortName: "CAC", players: [ ...mockPlayers.slice( 0,  8) ] },
  { name: "Liverpool Lions",       shortName: "LVL", players: [ ...mockPlayers.slice( 8, 16) ] },
  { name: "Mount Druitt Maniyaks", shortName: "MDM", players: [ ...mockPlayers.slice(16, 24) ] },
];
