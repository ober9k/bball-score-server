import type { NewPlayer } from "../../src/types/player";
import { Position } from "../../src/types/player/position";

export const mockPlayers: Array<NewPlayer> = [
  // Campbelltown Carabaos
  { name: "E. Berger",     position: Position.POINT_GUARD,    number: "16",  height: `5'3"`,  team: undefined },
  { name: "C. Corrales",   position: Position.POINT_GUARD,    number: "11",  height: `5'6"`,  team: undefined },
  { name: "M. Andres",     position: Position.SHOOTING_GUARD, number: "14",  height: `5'8"`,  team: undefined },
  { name: "G. Paul",       position: Position.SMALL_FORWARD,  number: "2",   height: `5'10"`, team: undefined },
  { name: "A.J. Montaño",  position: Position.SMALL_FORWARD,  number: "26",  height: `5'8"`,  team: undefined },
  { name: "R. Cowan",      position: Position.POWER_FORWARD,  number: "23",  height: `5'9"`,  team: undefined },
  { name: "T. Barrett",    position: Position.POWER_FORWARD,  number: "9",   height: `5'7"`,  team: undefined },
  { name: "G. Slack",      position: Position.CENTER,         number: "1",   height: `6'1"`,  team: undefined },
  // Liverpool Lions
  { name: "A. Parada",     position: Position.POINT_GUARD,    number: "00",  height: `5'7"`,  team: undefined },
  { name: "J. Romero",     position: Position.POINT_GUARD,    number: "8",   height: `5'7"`,  team: undefined },
  { name: "G. Lucarelli",  position: Position.SHOOTING_GUARD, number: "68",  height: `5'7"`,  team: undefined },
  { name: "F. Padilla",    position: Position.SHOOTING_GUARD, number: "11",  height: `5'8"`,  team: undefined },
  { name: "C.J. Percival", position: Position.SMALL_FORWARD,  number: "55",  height: `6'1"`,  team: undefined },
  { name: "S. Norton",     position: Position.POWER_FORWARD,  number: "9",   height: `5'10"`, team: undefined },
  { name: "S. Burns",      position: Position.POWER_FORWARD,  number: "22",  height: `5'11"`, team: undefined },
  { name: "C. Ventura",    position: Position.CENTER,         number: "12",  height: `6'0"`,  team: undefined },
  // Mount Druitt Maniyaks
  { name: "A. Miro",       position: Position.POINT_GUARD,    number: "16",  height: `5'6"`,  team: undefined },
  { name: "G. Marcon",     position: Position.POINT_GUARD,    number: "8",   height: `5'7"`,  team: undefined },
  { name: "A. Berrocal",   position: Position.SHOOTING_GUARD, number: "23",  height: `5'9"`,  team: undefined },
  { name: "V. Golding",    position: Position.SMALL_FORWARD,  number: "2",   height: `5'9"`,  team: undefined },
  { name: "A.J. Ramos",    position: Position.SMALL_FORWARD,  number: "22",  height: `5'8"`,  team: undefined },
  { name: "G. Marcon",     position: Position.POWER_FORWARD,  number: "9",   height: `6'3"`,  team: undefined },
  { name: "R. Walker",     position: Position.POWER_FORWARD,  number: "2",   height: `5'8"`,  team: undefined },
  { name: "R. Moreira",    position: Position.CENTER,         number: "12",  height: `6'0"`,  team: undefined },
];
