/*
  Warnings:

  - You are about to drop the `businesses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "businesses" DROP CONSTRAINT "businesses_created_by_id_fkey";

-- DropTable
DROP TABLE "businesses";
