/*
  Warnings:

  - A unique constraint covering the columns `[company_id,amount]` on the table `tax_rates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tax_rates_company_id_amount_key" ON "tax_rates"("company_id", "amount");
