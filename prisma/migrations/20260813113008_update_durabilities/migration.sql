/*
  Warnings:

  - Changed the type of `durability` on the `business_type_prices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentDurabilities" AS ENUM ('monthly', 'annualy');

-- AlterTable
ALTER TABLE "business_type_prices" DROP COLUMN "durability",
ADD COLUMN     "durability" "PaymentDurabilities" NOT NULL;

-- DropEnum
DROP TYPE "PamentDurabilities";
