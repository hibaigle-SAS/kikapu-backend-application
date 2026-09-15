-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "rccm" TEXT,
    "id_nat" TEXT,
    "numero_impot" TEXT,
    "creation_date" TIMESTAMP(3),
    "last_three_years_finance_report" TEXT,
    "number_of_employees" INTEGER DEFAULT 0,
    "revenue" DECIMAL(65,30),
    "income_statement" DECIMAL(65,30),
    "share_capital" DECIMAL(65,30),
    "initial_outcome" DECIMAL(65,30),
    "actions_number" DECIMAL(65,30),
    "created_by_id" TEXT,
    "owner_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "asset_types_name_key" ON "asset_types"("name");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_types" ADD CONSTRAINT "asset_types_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
