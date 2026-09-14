/*
  Warnings:

  - A unique constraint covering the columns `[country_code,phone]` on the table `otp_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "otp_codes_country_code_phone_key" ON "otp_codes"("country_code", "phone");
