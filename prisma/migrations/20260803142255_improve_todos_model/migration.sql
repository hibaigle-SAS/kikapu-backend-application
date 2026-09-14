/*
  Warnings:

  - You are about to drop the column `created_at` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `syncStatus` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "created_at",
DROP COLUMN "syncStatus",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- DropEnum
DROP TYPE "SyncStatusses";
