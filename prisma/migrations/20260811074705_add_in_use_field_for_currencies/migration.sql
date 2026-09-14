/*
  Warnings:

  - You are about to drop the column `active` on the `currencies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "currencies" DROP COLUMN "active",
ADD COLUMN     "in_use" BOOLEAN NOT NULL DEFAULT false;
