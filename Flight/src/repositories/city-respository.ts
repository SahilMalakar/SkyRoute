import CrudRepository from "./crud-respository.js";
import { prisma } from "../db/index.js";

console.log(`inside repository`);

export default class CityRepository extends CrudRepository<
  typeof prisma.city
> {
  constructor() {
    super(prisma.city);
  }
}
