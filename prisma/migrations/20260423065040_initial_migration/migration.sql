/*
  Warnings:

  - You are about to drop the `GameTeam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameTeamPlayer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameTeam" DROP CONSTRAINT "GameTeam_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameTeam" DROP CONSTRAINT "GameTeam_teamId_fkey";

-- DropForeignKey
ALTER TABLE "GameTeamPlayer" DROP CONSTRAINT "GameTeamPlayer_gameTeamId_fkey";

-- DropForeignKey
ALTER TABLE "GameTeamPlayer" DROP CONSTRAINT "GameTeamPlayer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "GameTeamPlayer" DROP CONSTRAINT "GameTeamPlayer_teamId_fkey";

-- DropTable
DROP TABLE "GameTeam";

-- DropTable
DROP TABLE "GameTeamPlayer";

-- CreateTable
CREATE TABLE "TeamLog" (
    "id" SERIAL NOT NULL,
    "side" "TeamSide" NOT NULL,
    "score" INTEGER NOT NULL,
    "byPeriod" INTEGER[],
    "gameId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerLog" (
    "started" BOOLEAN NOT NULL DEFAULT false,
    "seconds" INTEGER NOT NULL DEFAULT 0,
    "fgMade" INTEGER NOT NULL DEFAULT 0,
    "fgAttempted" INTEGER NOT NULL DEFAULT 0,
    "fg3Made" INTEGER NOT NULL DEFAULT 0,
    "fg3Attempted" INTEGER NOT NULL DEFAULT 0,
    "ftMade" INTEGER NOT NULL DEFAULT 0,
    "ftAttempted" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "offRebounds" INTEGER NOT NULL DEFAULT 0,
    "defRebounds" INTEGER NOT NULL DEFAULT 0,
    "rebounds" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "steals" INTEGER NOT NULL DEFAULT 0,
    "blocks" INTEGER NOT NULL DEFAULT 0,
    "turnovers" INTEGER NOT NULL DEFAULT 0,
    "personalFouls" INTEGER NOT NULL DEFAULT 0,
    "technicalFouls" INTEGER NOT NULL DEFAULT 0,
    "teamLogId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerLog_pkey" PRIMARY KEY ("teamLogId","playerId","teamId")
);

-- AddForeignKey
ALTER TABLE "TeamLog" ADD CONSTRAINT "TeamLog_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamLog" ADD CONSTRAINT "TeamLog_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerLog" ADD CONSTRAINT "PlayerLog_teamLogId_fkey" FOREIGN KEY ("teamLogId") REFERENCES "TeamLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerLog" ADD CONSTRAINT "PlayerLog_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerLog" ADD CONSTRAINT "PlayerLog_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
