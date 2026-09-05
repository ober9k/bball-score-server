import { mockPlayers } from "./players";
import type { MockPlayer } from "./players";

export type MockTeam = {
  name: string,
  shortName: string,
  players: MockPlayer[],
};

export const mockTeams: MockTeam[] = [
  { name: "Carabaos", shortName: "CAC", players: [ ...mockPlayers.slice( 0,  8) ] }, /* Campbelltown */
  { name: "Lions",    shortName: "LVL", players: [ ...mockPlayers.slice( 8, 16) ] }, /* Liverpool */
  { name: "Maniyaks", shortName: "MDM", players: [ ...mockPlayers.slice(16, 24) ] }, /* Mount Druitt */
  { name: "Eagles",   shortName: "EPE", players: [ ...mockPlayers.slice(24, 32) ] }, /* Edmondson Park */
];
