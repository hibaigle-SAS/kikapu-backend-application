-- DropIndex
DROP INDEX "otp_codes_phone_key";

-- AlterTable
ALTER TABLE "otp_codes" ADD COLUMN     "country_code" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;
