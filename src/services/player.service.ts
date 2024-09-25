import { Player, Position } from "@/interfaces/player.interface";
import { BaseService } from "@/services/base.service";
import { Collection, ObjectId, WithId } from "mongodb";

export class PlayerService extends BaseService<Player> {

    /* temporary values */
    public static mockPlayers: Array<Player> = [
        { name: "John Citizen", number: 11, position: Position.PointGuard },
        { name: "Jane Citizen", number: 22, position: Position.ShootingGuard },
    ];

    protected getCollection(): Collection<Player> {
        return this.db.collection<Player>("players");
    }

    public async findById(id: string): Promise<WithId<Player> | null> {
        const query = { _id: new ObjectId(id) };
        return await this.db.collection<Player>("players").findOne(query);
    }

}
