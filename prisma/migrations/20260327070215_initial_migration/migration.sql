/*
  Warnings:

  - You are about to drop the `PlayersOnTeams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayersOnTeams" DROP CONSTRAINT "PlayersOnTeams_playerId_fkey";

-- DropForeignKey
ALTER TABLE "PlayersOnTeams" DROP CONSTRAINT "PlayersOnTeams_teamId_fkey";

-- DropTable
DROP TABLE "PlayersOnTeams";

-- CreateTable
CREATE TABLE "TeamPlayer" (
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamPlayer_pkey" PRIMARY KEY ("playerId","teamId")
);

-- AddForeignKey
ALTER TABLE "TeamPlayer" ADD CONSTRAINT "TeamPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPlayer" ADD CONSTRAINT "TeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
