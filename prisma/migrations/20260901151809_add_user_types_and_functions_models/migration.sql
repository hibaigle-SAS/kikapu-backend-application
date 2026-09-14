/*
  Warnings:

  - You are about to drop the column `my_referal_code` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sponsor_referal_code` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_my_referal_code_key";

-- DropIndex
DROP INDEX "users_sponsor_referal_code_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "my_referal_code",
DROP COLUMN "sponsor_referal_code",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "birth_date" TEXT,
ADD COLUMN     "id_card" TEXT,
ADD COLUMN     "permission_id" TEXT,
ADD COLUMN     "user_type_id" TEXT;

-- CreateTable
CREATE TABLE "professions" (
    "id" TEXT NOT NULL,
    "created_by_id" TEXT,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "professions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_types" (
    "id" TEXT NOT NULL,
    "created_by_id" TEXT,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "professions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "user_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professions" ADD CONSTRAINT "professions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_types" ADD CONSTRAINT "user_types_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
