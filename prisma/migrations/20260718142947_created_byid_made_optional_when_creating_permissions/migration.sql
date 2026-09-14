-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_created_by_id_fkey";

-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
