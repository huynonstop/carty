/*
  Warnings:

  - A unique constraint covering the columns `[collectionId,tagId]` on the table `CollectionTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CollectionTag_collectionId_tagId_key` ON `CollectionTag`(`collectionId`, `tagId`);
