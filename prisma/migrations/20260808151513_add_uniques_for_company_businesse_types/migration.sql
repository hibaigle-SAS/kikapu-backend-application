/*
  Warnings:

  - A unique constraint covering the columns `[business_type_id,company_id]` on the table `company_businesse_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_businesse_types_business_type_id_company_id_key" ON "company_businesse_types"("business_type_id", "company_id");
