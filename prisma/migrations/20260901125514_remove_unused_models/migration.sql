/*
  Warnings:

  - You are about to drop the `Bonuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `business_type_prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `business_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_agent_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_agents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_businesse_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_currencies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `credit_payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offerings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tax_rates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `todos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bonuses" DROP CONSTRAINT "Bonuses_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Bonuses" DROP CONSTRAINT "Bonuses_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "business_type_prices" DROP CONSTRAINT "business_type_prices_business_type_id_fkey";

-- DropForeignKey
ALTER TABLE "business_type_prices" DROP CONSTRAINT "business_type_prices_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "business_type_prices" DROP CONSTRAINT "business_type_prices_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "business_types" DROP CONSTRAINT "business_types_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "comissions" DROP CONSTRAINT "comissions_company_id_fkey";

-- DropForeignKey
ALTER TABLE "comissions" DROP CONSTRAINT "comissions_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "comissions" DROP CONSTRAINT "comissions_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "company_agent_permissions" DROP CONSTRAINT "company_agent_permissions_company_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "company_agent_permissions" DROP CONSTRAINT "company_agent_permissions_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "company_agents" DROP CONSTRAINT "company_agents_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "company_agents" DROP CONSTRAINT "company_agents_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_agents" DROP CONSTRAINT "company_agents_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "company_agents" DROP CONSTRAINT "company_agents_role_id_fkey";

-- DropForeignKey
ALTER TABLE "company_businesse_types" DROP CONSTRAINT "company_businesse_types_business_type_id_fkey";

-- DropForeignKey
ALTER TABLE "company_businesse_types" DROP CONSTRAINT "company_businesse_types_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_currencies" DROP CONSTRAINT "company_currencies_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_currencies" DROP CONSTRAINT "company_currencies_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "company_currencies" DROP CONSTRAINT "company_currencies_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "credit_payments" DROP CONSTRAINT "credit_payments_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "credit_payments" DROP CONSTRAINT "credit_payments_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "credit_payments" DROP CONSTRAINT "credit_payments_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "offerings" DROP CONSTRAINT "offerings_business_type_id_fkey";

-- DropForeignKey
ALTER TABLE "offerings" DROP CONSTRAINT "offerings_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "offerings" DROP CONSTRAINT "offerings_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_company_businesse_type_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_company_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_offering_id_fkey";

-- DropForeignKey
ALTER TABLE "tax_rates" DROP CONSTRAINT "tax_rates_company_id_fkey";

-- DropForeignKey
ALTER TABLE "tax_rates" DROP CONSTRAINT "tax_rates_created_by_id_fkey";

-- DropTable
DROP TABLE "Bonuses";

-- DropTable
DROP TABLE "business_type_prices";

-- DropTable
DROP TABLE "business_types";

-- DropTable
DROP TABLE "comissions";

-- DropTable
DROP TABLE "companies";

-- DropTable
DROP TABLE "company_agent_permissions";

-- DropTable
DROP TABLE "company_agents";

-- DropTable
DROP TABLE "company_businesse_types";

-- DropTable
DROP TABLE "company_currencies";

-- DropTable
DROP TABLE "credit_payments";

-- DropTable
DROP TABLE "offerings";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "sales";

-- DropTable
DROP TABLE "tax_rates";

-- DropTable
DROP TABLE "todos";

-- DropEnum
DROP TYPE "PaymentDurabilities";

-- DropEnum
DROP TYPE "SaleType";

-- DropEnum
DROP TYPE "TodoStatusses";
