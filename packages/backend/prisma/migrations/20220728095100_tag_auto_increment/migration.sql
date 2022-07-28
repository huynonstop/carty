/*
  Warnings:

  - You are about to alter the column `tagId` on the `collectiontag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `collectiontag` DROP FOREIGN KEY `CollectionTag_tagId_fkey`;

-- AlterTable
ALTER TABLE `collectiontag` MODIFY `tagId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tag` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `CollectionTag` ADD CONSTRAINT `CollectionTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
