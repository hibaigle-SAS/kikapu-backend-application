/*
  Warnings:

  - Added the required column `durability` to the `Bonuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durability_count` to the `Bonuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Bonuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Bonuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Bonuses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bonuses" ADD COLUMN     "durability" "PaymentDurabilities" NOT NULL,
ADD COLUMN     "durability_count" INTEGER NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Bonuses" ADD CONSTRAINT "Bonuses_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
