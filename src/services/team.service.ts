import { Team } from "@/interfaces/team.interface";
import { BaseService } from "@/services/base.service";
import { Collection } from "mongodb";

export class TeamService extends BaseService<Team> {

    /* temporary values */
    public static mockTeams: Array<Team> = [
        { name: "Ballers" },
        { name: "56ers" },
    ];

    protected getCollection(): Collection<Team> {
        return this.db.collection<Team>("teams");
    }

}
