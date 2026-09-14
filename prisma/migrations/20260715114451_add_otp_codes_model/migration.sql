-- CreateTable
CREATE TABLE "otp_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL,
    "email_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otp_codes_code_key" ON "otp_codes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "otp_codes_phone_key" ON "otp_codes"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "otp_codes_email_address_key" ON "otp_codes"("email_address");
