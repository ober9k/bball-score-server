import type { Game } from "@/types/game";
import type { Player } from "@/types/player";
import type { Season } from "@/types/season";
import type { Stats } from "@/types/stats";
import type { Team } from "@/types/team";

export type StatisticsLog = {
  id:      number,
  player:  Player,
  played:  number,
  started: number,
  stats:   Stats,
  /* temp */
  season?: Season, /* player/team stats */
  team?:   Team,   /* team stats */
  game?:   Game,   /* player game log */
}
