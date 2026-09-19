/*
  Warnings:

  - You are about to alter the column `company_net_worth` on the `company_evaluations` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "company_evaluations" ALTER COLUMN "company_net_worth" SET DATA TYPE DECIMAL(65,30);
