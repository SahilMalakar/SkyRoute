import { prisma } from "../db/index.js";
import CrudRepository from "./crud-respository.js";

export default class AirportRepository extends CrudRepository<
  typeof prisma.airport
> {
  constructor() {
    super(prisma.airport);
  }
}
