/*
  Warnings:

  - A unique constraint covering the columns `[rccm]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_nat]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero_impot]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_company_type_id_fkey";

-- DropForeignKey
ALTER TABLE "company_evaluations" DROP CONSTRAINT "company_evaluations_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_evaluations" DROP CONSTRAINT "company_evaluations_validate_by_id_fkey";

-- DropForeignKey
ALTER TABLE "company_has_assets_type_details" DROP CONSTRAINT "company_has_assets_type_details_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "company_has_assets_types" DROP CONSTRAINT "company_has_assets_types_asset_type_id_fkey";

-- DropForeignKey
ALTER TABLE "company_has_assets_types" DROP CONSTRAINT "company_has_assets_types_company_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_type_id_fkey";

-- AlterTable
ALTER TABLE "company_has_assets_type_details" ADD COLUMN     "companyHasAssetsTypesId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "companies_rccm_key" ON "companies"("rccm");

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_nat_key" ON "companies"("id_nat");

-- CreateIndex
CREATE UNIQUE INDEX "companies_numero_impot_key" ON "companies"("numero_impot");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "professions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "user_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_company_type_id_fkey" FOREIGN KEY ("company_type_id") REFERENCES "company_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_has_assets_types" ADD CONSTRAINT "company_has_assets_types_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_has_assets_types" ADD CONSTRAINT "company_has_assets_types_asset_type_id_fkey" FOREIGN KEY ("asset_type_id") REFERENCES "asset_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_has_assets_type_details" ADD CONSTRAINT "company_has_assets_type_details_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_has_assets_type_details" ADD CONSTRAINT "company_has_assets_type_details_companyHasAssetsTypesId_fkey" FOREIGN KEY ("companyHasAssetsTypesId") REFERENCES "company_has_assets_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_evaluations" ADD CONSTRAINT "company_evaluations_validate_by_id_fkey" FOREIGN KEY ("validate_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_evaluations" ADD CONSTRAINT "company_evaluations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
