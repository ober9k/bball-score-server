import { Team } from "@/interfaces/team.interface";
import { ObjectId } from "mongodb";

export class TeamService {

    /* temporary values */
    private readonly teams: Array<Team> = [
        { _id: new ObjectId(1), name: "Ballers" },
        { _id: new ObjectId(2), name: "56ers" },
    ];

    public find(): Array<Team> {
        return this.teams;
    }

}
