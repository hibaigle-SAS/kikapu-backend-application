/*
  Warnings:

  - Made the column `business_type_id` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TodoStatusses" AS ENUM ('completed', 'pending', 'in_progress');

-- CreateEnum
CREATE TYPE "SyncStatusses" AS ENUM ('pending', 'in_progress', 'synchronised', 'error');

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_business_type_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "business_type_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "TodoStatusses",
    "syncStatus" "SyncStatusses",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
