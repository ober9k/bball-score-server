import { Season } from "@/interfaces/season.interface";
import { ObjectId } from "mongodb";

export class SeasonService {

    /* temporary values */
    private readonly seasons: Array<Season> = [
        { _id: new ObjectId(1), name: "Season 1" },
        { _id: new ObjectId(2), name: "Season 2" },
    ];

    public find(): Array<Season> {
        return this.seasons;
    }

}
