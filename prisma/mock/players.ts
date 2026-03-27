import { Position, type PositionType } from "@/types/player/position";

export type MockPlayer = {
  name: string,
  position: PositionType,
  number: string,
  height: string,
};

export const mockPlayers: MockPlayer[] = [
  // Campbelltown Carabaos
  { name: "E. Berger",     position: Position.POINT_GUARD,    number: "16",  height: `5'3"`   },
  { name: "C. Corrales",   position: Position.POINT_GUARD,    number: "11",  height: `5'6"`   },
  { name: "M. Andres",     position: Position.SHOOTING_GUARD, number: "14",  height: `5'8"`   },
  { name: "G. Paul",       position: Position.SMALL_FORWARD,  number: "2",   height: `5'10"`  },
  { name: "A.J. Montaño",  position: Position.SMALL_FORWARD,  number: "26",  height: `5'8"`   },
  { name: "R. Cowan",      position: Position.POWER_FORWARD,  number: "23",  height: `5'9"`   },
  { name: "T. Barrett",    position: Position.POWER_FORWARD,  number: "9",   height: `5'7"`   },
  { name: "G. Slack",      position: Position.CENTER,         number: "1",   height: `6'1"`   },
  // Liverpool Lions
  { name: "A. Parada",     position: Position.POINT_GUARD,    number: "00",  height: `5'7"`   },
  { name: "J. Romero",     position: Position.POINT_GUARD,    number: "8",   height: `5'7"`   },
  { name: "G. Lucarelli",  position: Position.SHOOTING_GUARD, number: "68",  height: `5'7"`   },
  { name: "F. Padilla",    position: Position.SHOOTING_GUARD, number: "11",  height: `5'8"`   },
  { name: "C.J. Percival", position: Position.SMALL_FORWARD,  number: "55",  height: `6'1"`   },
  { name: "S. Norton",     position: Position.POWER_FORWARD,  number: "9",   height: `5'10"`  },
  { name: "S. Burns",      position: Position.POWER_FORWARD,  number: "22",  height: `5'11"`  },
  { name: "C. Ventura",    position: Position.CENTER,         number: "12",  height: `6'0"`   },
  // Mount Druitt Maniyaks
  { name: "A. Miro",       position: Position.POINT_GUARD,    number: "16",  height: `5'6"`   },
  { name: "G. Marcon",     position: Position.POINT_GUARD,    number: "8",   height: `5'7"`   },
  { name: "A. Berrocal",   position: Position.SHOOTING_GUARD, number: "23",  height: `5'9"`   },
  { name: "V. Golding",    position: Position.SMALL_FORWARD,  number: "2",   height: `5'9"`   },
  { name: "A.J. Ramos",    position: Position.SMALL_FORWARD,  number: "22",  height: `5'8"`   },
  { name: "G. Marcon",     position: Position.POWER_FORWARD,  number: "9",   height: `6'3"`   },
  { name: "R. Walker",     position: Position.POWER_FORWARD,  number: "2",   height: `5'8"`   },
  { name: "R. Moreira",    position: Position.CENTER,         number: "12",  height: `6'0"`   },
];
