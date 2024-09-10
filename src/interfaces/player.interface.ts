import * as mongodb from "mongodb";

export enum Position {
    PointGuard = "pointGuard",
    ShootingGuard = "shootingGuard",
    SmallForward = "smallForward",
    PowerForward = "powerForward",
    Center = "center",
}

export interface Player {
    _id?: mongodb.ObjectId;
    name: string;
    number: number;
    position: Position.PointGuard | Position.ShootingGuard | Position.SmallForward | Position.PowerForward | Position.Center;
}
