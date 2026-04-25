/*
  Warnings:

  - Added the required column `divisionId` to the `PlayerLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `PlayerLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `divisionId` to the `TeamLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `TeamLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerLog" ADD COLUMN     "divisionId" INTEGER NOT NULL,
ADD COLUMN     "seasonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeamLog" ADD COLUMN     "divisionId" INTEGER NOT NULL,
ADD COLUMN     "seasonId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamLog" ADD CONSTRAINT "TeamLog_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamLog" ADD CONSTRAINT "TeamLog_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerLog" ADD CONSTRAINT "PlayerLog_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerLog" ADD CONSTRAINT "PlayerLog_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
