/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Bonuses` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `Bonuses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bonuses" DROP CONSTRAINT "Bonuses_owner_id_fkey";

-- AlterTable
ALTER TABLE "Bonuses" DROP COLUMN "owner_id",
ADD COLUMN     "company_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bonuses" ADD CONSTRAINT "Bonuses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
