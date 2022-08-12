-- DropIndex
DROP INDEX `Collection_description_idx` ON `collection`;

-- CreateIndex
CREATE FULLTEXT INDEX `Collection_description_name_idx` ON `Collection`(`description`, `name`);
