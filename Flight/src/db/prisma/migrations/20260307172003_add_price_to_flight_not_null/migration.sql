/*
  Warnings:

  - Made the column `price` on table `Flight` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Flight" ALTER COLUMN "price" SET NOT NULL;
