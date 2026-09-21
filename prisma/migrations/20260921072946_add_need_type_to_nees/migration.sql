-- AlterTable
ALTER TABLE "needs" ADD COLUMN     "need_type_id" TEXT;

-- AddForeignKey
ALTER TABLE "needs" ADD CONSTRAINT "needs_need_type_id_fkey" FOREIGN KEY ("need_type_id") REFERENCES "needs_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
