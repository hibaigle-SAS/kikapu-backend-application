/*
  Warnings:

  - You are about to drop the column `end_date` on the `Bonuses` table. All the data in the column will be lost.
  - Added the required column `finish_date` to the `Bonuses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bonuses" DROP COLUMN "end_date",
ADD COLUMN     "finish_date" TIMESTAMP(3) NOT NULL;
