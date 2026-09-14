-- CreateTable
CREATE TABLE "todos_222" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "TodoStatusses",
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "todos_222_pkey" PRIMARY KEY ("id")
);
