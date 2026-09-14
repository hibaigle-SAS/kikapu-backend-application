-- CreateTable
CREATE TABLE "company_types" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "created_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_types" ADD CONSTRAINT "company_types_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
