/*
  Warnings:

  - You are about to drop the column `address` on the `Airport` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Airport` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Airport" DROP COLUMN "address",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Airport_code_key" ON "Airport"("code");
