import { Season } from "@/interfaces/season.interface";
import { BaseService } from "@/services/base.service";
import { Collection, WithId } from "mongodb";

export class SeasonService extends BaseService<Season> {

    /* temporary values */
    public static mockSeasons: Array<Season> = [
        { name: "Season 1" },
        { name: "Season 2" },
    ];

    protected getCollection(): Collection<Season> {
        return this.db.collection<Season>("seasons");
    }

}
