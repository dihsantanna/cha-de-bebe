/*
 Warnings:
 
 - You are about to rename the `email` column to `username` in the `Users` table.
 - A unique constraint covering the `[username]` columns in the `Users` table will be added. If there are existing duplicate values ​​this will fail.
 - Added mandatory `username` column to `Users` table without a default value. This is not possible if the table is not empty.
 
 */
-- DropIndex
DROP INDEX `Users_email_key` ON `Users`;
-- AlterTable
ALTER TABLE `Users`
  RENAME COLUMN `email` TO `username`;
-- CreateIndex
CREATE UNIQUE INDEX `Users_username_key` ON `Users`(`username`);