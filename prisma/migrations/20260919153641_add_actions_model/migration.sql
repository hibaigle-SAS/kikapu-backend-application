-- CreateTable
CREATE TABLE "actions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_by_id" TEXT,
    "action_category_id" TEXT,
    "action_type_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "actions_name_key" ON "actions"("name");

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_action_category_id_fkey" FOREIGN KEY ("action_category_id") REFERENCES "action_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_action_type_id_fkey" FOREIGN KEY ("action_type_id") REFERENCES "action_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
