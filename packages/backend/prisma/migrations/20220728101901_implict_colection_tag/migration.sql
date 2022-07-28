/*
  Warnings:

  - You are about to drop the `collectiontag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `collectiontag` DROP FOREIGN KEY `CollectionTag_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `collectiontag` DROP FOREIGN KEY `CollectionTag_tagId_fkey`;

-- DropTable
DROP TABLE `collectiontag`;

-- CreateTable
CREATE TABLE `_CollectionToTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CollectionToTag_AB_unique`(`A`, `B`),
    INDEX `_CollectionToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CollectionToTag` ADD CONSTRAINT `_CollectionToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Collection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollectionToTag` ADD CONSTRAINT `_CollectionToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
