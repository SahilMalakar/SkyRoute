import CrudRepository from "./crud-respository.js";
import { prisma } from "../db/index.js";

export default class AirplaneRepository extends CrudRepository<
  typeof prisma.airplane
> {
  constructor() {
    super(prisma.airplane);
  }
}
