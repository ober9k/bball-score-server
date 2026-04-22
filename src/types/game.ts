import type { GameTeam } from "@/types/game/game-team";
import type { GamePhaseType } from "@/types/game/game-phase";


export type Game = {
  id: number,
  date: Date,
  phase: GamePhaseType,
  round: number,
  active: boolean,
  archived: boolean,
  leagueId: number,
  seasonId: number,
  divisionId: number,
  gameTeams: GameTeam[],
};

export type GameData = Omit<Game, "id" | "gameTeams">;
