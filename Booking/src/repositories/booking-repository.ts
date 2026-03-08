import { prisma } from "../db/index.js";
import CrudRepository from "./crud-repository.js";


export default class BookingRepository extends CrudRepository<
  typeof prisma.booking
> {
  constructor() {
    super(prisma.booking);
  }
}
