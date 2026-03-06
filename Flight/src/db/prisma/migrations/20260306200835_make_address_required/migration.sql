/*
  Warnings:

  - Made the column `address` on table `Airport` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Airport" ALTER COLUMN "address" SET NOT NULL;
