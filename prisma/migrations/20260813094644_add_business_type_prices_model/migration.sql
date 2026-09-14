-- CreateEnum
CREATE TYPE "PamentDurabilities" AS ENUM ('monthly', 'annualy');

-- CreateTable
CREATE TABLE "business_type_prices" (
    "id" TEXT NOT NULL,
    "durability" "PamentDurabilities" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency_id" TEXT NOT NULL,
    "business_type_id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_type_prices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "business_type_prices" ADD CONSTRAINT "business_type_prices_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_type_prices" ADD CONSTRAINT "business_type_prices_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_type_prices" ADD CONSTRAINT "business_type_prices_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
