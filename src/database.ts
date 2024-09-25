import { playerSchema } from "@/database/player.schema";
import { seasonSchema } from "@/database/season.schema";
import { teamSchema } from "@/database/team.schema";
import { Player } from "@/interfaces/player.interface";
import { Season } from "@/interfaces/season.interface";
import { Team } from "@/interfaces/team.interface";
import { PlayerService } from "@/services/player.service";
import { SeasonService } from "@/services/season.service";
import { TeamService } from "@/services/team.service";
import { Db, MongoClient } from "mongodb";

export async function dbConnect(uri: string) {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("bballScore");
    await applySchemaValidation(db);
    await clearData(db);
    await applyData(db);

    return client;
}

async function applySchemaValidation(db: Db) {
    await db.createCollection("players", { validator: playerSchema });
    await db.createCollection("seasons", { validator: seasonSchema });
    await db.createCollection("teams",   { validator: teamSchema   });
}

async function clearData(db: Db) {
    const { players, seasons, teams } = await getCollections(db);
    await players.deleteMany();
    await seasons.deleteMany();
    await teams.deleteMany();
}

async function applyData(db: Db) {
    const { players, seasons, teams } = await getCollections(db);
    await players.insertMany(PlayerService.mockPlayers);
    await seasons.insertMany(SeasonService.mockSeasons);
    await teams.insertMany(TeamService.mockTeams);
}

async function getCollections(db: Db) {
    return {
        players: db.collection<Player>("players"),
        seasons: db.collection<Season>("seasons"),
        teams:   db.collection<Team>("team"),
    }
}
