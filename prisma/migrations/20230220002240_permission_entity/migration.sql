/*
  Warnings:

  - Added the required column `groupId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_firstName_lastName_email_idx` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `groupId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `permissions` (
    `userId` INTEGER NOT NULL,
    `resourceId` INTEGER NOT NULL,
    `listAccess` ENUM('ALLOWED', 'DENIED') NOT NULL DEFAULT 'DENIED',
    `addAccess` ENUM('ALLOWED', 'DENIED') NOT NULL DEFAULT 'DENIED',
    `updateAccess` ENUM('ALLOWED', 'DENIED') NOT NULL DEFAULT 'DENIED',
    `deleteAccess` ENUM('ALLOWED', 'DENIED') NOT NULL DEFAULT 'DENIED',
    `printAccess` ENUM('ALLOWED', 'DENIED') NOT NULL DEFAULT 'DENIED',
    `exportAccess` ENUM('ALLOWED', 'DENIED') NOT NULL DEFAULT 'DENIED',
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`, `resourceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `users_firstName_lastName_email_groupId_idx` ON `users`(`firstName`, `lastName`, `email`, `groupId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_resourceId_fkey` FOREIGN KEY (`resourceId`) REFERENCES `resources`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
