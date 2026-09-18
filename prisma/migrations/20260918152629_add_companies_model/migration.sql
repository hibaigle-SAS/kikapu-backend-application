-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "company_type_id" TEXT;

-- CreateTable
CREATE TABLE "company_has_assets_types" (
    "id" TEXT NOT NULL,
    "company_id" TEXT,
    "asset_type_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_has_assets_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_has_assets_type_details" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,
    "amount" DOUBLE PRECISION,
    "acquisition_date" TIMESTAMP(3),
    "currency_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_has_assets_type_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_evaluations" (
    "id" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "company_net_worth" DOUBLE PRECISION NOT NULL,
    "reason" TEXT,
    "validate_by_id" TEXT,
    "company_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_evaluations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_company_type_id_fkey" FOREIGN KEY ("company_type_id") REFERENCES "company_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_has_assets_types" ADD CONSTRAINT "company_has_assets_types_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_has_assets_types" ADD CONSTRAINT "company_has_assets_types_asset_type_id_fkey" FOREIGN KEY ("asset_type_id") REFERENCES "asset_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_has_assets_type_details" ADD CONSTRAINT "company_has_assets_type_details_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_evaluations" ADD CONSTRAINT "company_evaluations_validate_by_id_fkey" FOREIGN KEY ("validate_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_evaluations" ADD CONSTRAINT "company_evaluations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
