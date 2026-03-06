import CrudRepository from "./crud-respository.js";
import { prisma } from "../db/index.js";

console.log(`inside repository`);

export default class AirplaneRepository extends CrudRepository<
  typeof prisma.airline
> {
  constructor() {
    super(prisma.airline);
  }
}
