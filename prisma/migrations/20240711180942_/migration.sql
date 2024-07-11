-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "confirmedPresence" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "UsersItems" (
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UsersItems_itemId_key" ON "UsersItems"("itemId");

-- CreateIndex
CREATE INDEX "UsersItems_userId_idx" ON "UsersItems"("userId");
