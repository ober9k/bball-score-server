import { Model } from "@/interfaces/model.interface";

export enum Position {
    PointGuard = "pointGuard",
    ShootingGuard = "shootingGuard",
    SmallForward = "smallForward",
    PowerForward = "powerForward",
    Center = "center",
}

export interface Player extends Model {
    name: string;
    number: number;
    position: Position.PointGuard | Position.ShootingGuard | Position.SmallForward | Position.PowerForward | Position.Center;
}
