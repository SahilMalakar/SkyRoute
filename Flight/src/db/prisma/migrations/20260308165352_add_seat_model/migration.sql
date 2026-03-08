-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST');

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "seatLetter" TEXT NOT NULL,
    "seatType" "SeatType" NOT NULL DEFAULT 'ECONOMY',
    "airplaneId" INTEGER NOT NULL,
    "flightId" INTEGER NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE CASCADE ON UPDATE CASCADE;
