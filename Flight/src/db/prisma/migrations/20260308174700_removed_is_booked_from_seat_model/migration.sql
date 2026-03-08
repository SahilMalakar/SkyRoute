/*
  Warnings:

  - You are about to drop the column `isBooked` on the `Seat` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "isBooked",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
