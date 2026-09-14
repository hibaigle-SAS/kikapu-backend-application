/*
  Warnings:

  - You are about to drop the column `in_use` on the `currencies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "currencies" DROP COLUMN "in_use",
ADD COLUMN     "created_by_id" TEXT;

-- CreateTable
CREATE TABLE "company_currencies" (
    "id" TEXT NOT NULL,
    "in_use" BOOLEAN NOT NULL DEFAULT false,
    "currency_id" TEXT,
    "created_by_id" TEXT,
    "company_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_currencies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_currencies" ADD CONSTRAINT "company_currencies_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_currencies" ADD CONSTRAINT "company_currencies_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_currencies" ADD CONSTRAINT "company_currencies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
