/*
  Warnings:

  - You are about to drop the column `business_type_id` on the `payments` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_business_type_id_fkey";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "business_type_id",
ADD COLUMN     "company_businesse_type_id" TEXT,
ADD COLUMN     "company_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_company_businesse_type_id_fkey" FOREIGN KEY ("company_businesse_type_id") REFERENCES "company_businesse_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
