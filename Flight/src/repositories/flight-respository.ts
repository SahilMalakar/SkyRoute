import CrudRepository from "./crud-respository.js";
import { prisma } from "../db/index.js";

export default class FlightRepository extends CrudRepository<typeof prisma.flight> {
  constructor() {
    super(prisma.flight);
  }
}
