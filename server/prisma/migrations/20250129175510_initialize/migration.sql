-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "To" TEXT NOT NULL DEFAULT 'Anonymous',
    "userid" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
