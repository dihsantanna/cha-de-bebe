-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "confirmedPresence" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersItems" (
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UsersItems_itemId_key" ON "UsersItems"("itemId");

-- CreateIndex
CREATE INDEX "UsersItems_userId_idx" ON "UsersItems"("userId");

-- AddForeignKey
ALTER TABLE "UsersItems" ADD CONSTRAINT "UsersItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersItems" ADD CONSTRAINT "UsersItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
