/*
  Warnings:

  - Added the required column `permissionId` to the `user_permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_permissions" ADD COLUMN     "permissionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
