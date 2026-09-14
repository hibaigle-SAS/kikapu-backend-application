/*
  Warnings:

  - You are about to drop the column `valid` on the `company_agent_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `valid` on the `company_agents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "company_agent_permissions" DROP COLUMN "valid";

-- AlterTable
ALTER TABLE "company_agents" DROP COLUMN "valid",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT true;
