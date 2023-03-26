-- DropForeignKey
ALTER TABLE `UsersItems` DROP FOREIGN KEY `UsersItems_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersItems` DROP FOREIGN KEY `UsersItems_userId_fkey`;

-- RenameIndex
ALTER TABLE `UsersItems` RENAME INDEX `UsersItems_userId_fkey` TO `UsersItems_userId_idx`;
