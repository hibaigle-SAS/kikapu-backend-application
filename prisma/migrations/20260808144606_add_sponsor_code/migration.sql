/*
  Warnings:

  - You are about to drop the column `referal_code` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "referal_code",
ADD COLUMN     "my_referal_code" TEXT,
ADD COLUMN     "sponsor_referal_code" TEXT;
