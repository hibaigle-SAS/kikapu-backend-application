/*
  Warnings:

  - You are about to drop the column `created_by_id` on the `comissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `comissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `comissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `comissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comissions" DROP CONSTRAINT "comissions_created_by_id_fkey";

-- AlterTable
ALTER TABLE "comissions" DROP COLUMN "created_by_id",
ADD COLUMN     "currency_id" TEXT,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "payment_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "comissions_payment_id_key" ON "comissions"("payment_id");

-- AddForeignKey
ALTER TABLE "comissions" ADD CONSTRAINT "comissions_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comissions" ADD CONSTRAINT "comissions_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comissions" ADD CONSTRAINT "comissions_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
