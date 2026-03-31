import "dotenv/config";
import { connectionString, prisma } from "@/lib/prisma";
import type { Division } from "@/types/division";
import type { Game } from "@/types/game";
import type { League } from "@/types/league";
import type { Player } from "@/types/player";
import type { Season } from "@/types/season";
import type { Team } from "@/types/team";
import * as bcrypt from "bcryptjs";
import { Pool } from "pg";
import { mockGames } from "./mock/games";
import { mockLeagues } from "./mock/leagues";
import { mockUsers } from "./mock/users";

const pool = new Pool({ connectionString });

async function main() {

  for (const u of mockUsers) {
    const user = await prisma.user.create({
      data: {
        email:    u.email,
        password: await bcrypt.hash(u.password, 12),
        role:     u.role,
      },
    });

    console.log('Created user:', user);
  }

  /**
   * TODO:
   * This needs a re-work, but due to some issues using the nested create within season (and below), a bunch of loops has instead been used for now.
   */
  for (const l of mockLeagues) {
    const league = await prisma.league.create({
      data: {
        name: l.name,
        slug: l.slug,
      }
    }) as League;

    console.log('Created league:', league);

    for (const s of l.seasons) {
      const season = await prisma.season.create({
        data: {
          name: s.name,
          leagueId: league.id,
        }
      }) as Season;

      console.log('Created season:', season);

      for (const d of s.divisions) {
        const division = await prisma.division.create({
          data: {
            name: d.name,
            leagueId: league.id,
            seasonId: season.id,
          }
        }) as Division;

        console.log('Created division:', division);

        for (const t of d.teams) {
          const team = await prisma.team.create({
            data: {
              name: t.name,
              shortName: t.shortName,
              leagueId: league.id,
              divisionId: division.id,
            }
          }) as Team;

          console.log('Created team:', team);

          for (const p of t.players) {
            const player = await prisma.player.create({
              data: {
                name: p.name,
                position: p.position,
                number: p.number,
                height: p.height,
                leagueId: league.id,
              }
            }) as Player;

            console.log('Created player:', player);

            /* players exist on a per season/division/team basis */
            const teamPlayer = await prisma.teamPlayer.create({
              data: {
                teamId: team.id,
                playerId: player.id,
              }
            });

            console.log('Created teamPlayer:', teamPlayer);
          }
        }
      }
    }

    const { id: leagueId } = league;
    const { id: seasonId } = await prisma.season.findFirst();
    const { id: divisionId } = await prisma.division.findFirst();

    for (const g of mockGames) {
      const game = await prisma.game.create({
        data: {
          date:       g.date,
          phase:      g.phase,
          round:      g.round,
          leagueId:   leagueId,
          seasonId:   seasonId,
          divisionId: divisionId,
        },
      }) as Game;

      const { id: gameId } = game;

      for (const gt of g.gameTeams) {
        const teamId = gt.teamId;
        const teamPlayers = gt.teamPlayers
          .map((gtp) => ({
            ...gtp, teamId,
          }));

        const gameTeam = await prisma.gameTeam.create({
          data: {
            side: gt.side,
            score: gt.score,
            scoreByPeriod: gt.scoreByPeriod,
            gameId,
            teamId,
            gameTeamPlayers: {
              create: [
                ...teamPlayers
              ],
            }
          }
        }) as any;

        console.log('Created gameTeam:', gameTeam);
      }

      console.log('Created game:', game);
    }

  }

}

main()
  .then((
    async () => {
      await prisma.$disconnect();
      await pool.end();
    }
  ))
  .catch((async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  }));
