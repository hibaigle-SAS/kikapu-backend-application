-- CreateTable
CREATE TABLE "last_todos" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "TodoStatusses",
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "last_todos_pkey" PRIMARY KEY ("id")
);
