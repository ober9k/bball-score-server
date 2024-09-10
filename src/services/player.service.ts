import { Player, Position } from "@/interfaces/player.interface";
import { ObjectId } from "mongodb";

export class PlayerService {

    /* temporary values */
    private readonly players: Array<Player> = [
        { _id: new ObjectId(1), name: "John Citizen", number: 11, position: Position.PointGuard },
        { _id: new ObjectId(2), name: "Jane Citizen", number: 22, position: Position.ShootingGuard },
    ];

    public find(): Array<Player> {
        return this.players;
    }

}
