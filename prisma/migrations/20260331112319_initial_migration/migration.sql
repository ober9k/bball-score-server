/*
  Warnings:

  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GamePhase" AS ENUM ('PRE_SEASON', 'REGULAR_SEASON', 'POST_SEASON');

-- CreateEnum
CREATE TYPE "TeamSide" AS ENUM ('AWAY_TEAM', 'HOME_TEAM');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('GUEST', 'USER', 'MANAGER', 'ADMINISTRATOR');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "phase" "GamePhase" NOT NULL,
    "round" INTEGER NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameTeam" (
    "id" SERIAL NOT NULL,
    "side" "TeamSide" NOT NULL,
    "score" INTEGER NOT NULL,
    "scoreByPeriod" INTEGER[],
    "gameId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameTeamPlayer" (
    "started" BOOLEAN NOT NULL,
    "seconds" INTEGER NOT NULL,
    "fgMade" INTEGER NOT NULL,
    "fgAttempted" INTEGER NOT NULL,
    "fg3Made" INTEGER NOT NULL,
    "fg3Attempted" INTEGER NOT NULL,
    "ftMade" INTEGER NOT NULL,
    "ftAttempted" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "offRebounds" INTEGER NOT NULL,
    "defRebounds" INTEGER NOT NULL,
    "rebounds" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "steals" INTEGER NOT NULL,
    "blocks" INTEGER NOT NULL,
    "turnovers" INTEGER NOT NULL,
    "personalFouls" INTEGER NOT NULL,
    "technicalFouls" INTEGER NOT NULL,
    "gameTeamId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameTeamPlayer_pkey" PRIMARY KEY ("gameTeamId","playerId","teamId")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTeam" ADD CONSTRAINT "GameTeam_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTeam" ADD CONSTRAINT "GameTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTeamPlayer" ADD CONSTRAINT "GameTeamPlayer_gameTeamId_fkey" FOREIGN KEY ("gameTeamId") REFERENCES "GameTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTeamPlayer" ADD CONSTRAINT "GameTeamPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTeamPlayer" ADD CONSTRAINT "GameTeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
