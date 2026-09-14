/*
  Warnings:

  - You are about to drop the column `payment_id` on the `comissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comissions" DROP CONSTRAINT "comissions_payment_id_fkey";

-- DropIndex
DROP INDEX "comissions_payment_id_key";

-- AlterTable
ALTER TABLE "comissions" DROP COLUMN "payment_id";
