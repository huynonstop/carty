/*
  Warnings:

  - You are about to drop the column `itemId` on the `collectiontag` table. All the data in the column will be lost.
  - Added the required column `collectionId` to the `CollectionTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `collectiontag` DROP FOREIGN KEY `CollectionTag_itemId_fkey`;

-- AlterTable
ALTER TABLE `collectiontag` DROP COLUMN `itemId`,
    ADD COLUMN `collectionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CollectionTag` ADD CONSTRAINT `CollectionTag_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
