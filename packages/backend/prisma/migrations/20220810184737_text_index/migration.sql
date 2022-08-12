-- CreateIndex
CREATE FULLTEXT INDEX `Collection_name_idx` ON `Collection`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Collection_description_idx` ON `Collection`(`description`);

-- CreateIndex
CREATE FULLTEXT INDEX `Tag_label_idx` ON `Tag`(`label`);
