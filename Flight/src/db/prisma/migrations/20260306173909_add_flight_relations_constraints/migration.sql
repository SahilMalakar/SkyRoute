/*
  Warnings:

  - You are about to drop the `Airline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Airline";

-- CreateTable
CREATE TABLE "Airplane" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Airplane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "airplaneId" INTEGER NOT NULL,
    "departureAirportId" INTEGER NOT NULL,
    "arrivalAirportId" INTEGER NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "boardingGate" TEXT NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Airplane_model_idx" ON "Airplane"("model");

-- CreateIndex
CREATE INDEX "Flight_airplaneId_idx" ON "Flight"("airplaneId");

-- CreateIndex
CREATE INDEX "Flight_departureAirportId_idx" ON "Flight"("departureAirportId");

-- CreateIndex
CREATE INDEX "Flight_arrivalAirportId_idx" ON "Flight"("arrivalAirportId");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_flightNumber_departureTime_key" ON "Flight"("flightNumber", "departureTime");

-- CreateIndex
CREATE INDEX "Airport_cityId_idx" ON "Airport"("cityId");

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_arrivalAirportId_fkey" FOREIGN KEY ("arrivalAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
