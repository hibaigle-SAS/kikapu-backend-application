/*
  Warnings:

  - A unique constraint covering the columns `[sponsor_referal_code]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_sponsor_referal_code_key" ON "users"("sponsor_referal_code");
