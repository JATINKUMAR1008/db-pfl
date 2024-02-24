-- AlterTable
ALTER TABLE `Service` ADD COLUMN `dbUser` VARCHAR(191) NOT NULL DEFAULT 'admin',
    ADD COLUMN `password` VARCHAR(191) NULL;
