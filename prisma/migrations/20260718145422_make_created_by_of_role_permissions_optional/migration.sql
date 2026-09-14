-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_created_by_id_fkey";

-- AlterTable
ALTER TABLE "role_permissions" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
