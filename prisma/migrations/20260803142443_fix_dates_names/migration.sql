/*
  Warnings:

  - You are about to drop the column `createdAt` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);
