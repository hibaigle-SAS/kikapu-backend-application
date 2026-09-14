/*
  Warnings:

  - You are about to drop the column `customerName` on the `sales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sales" DROP COLUMN "customerName",
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
