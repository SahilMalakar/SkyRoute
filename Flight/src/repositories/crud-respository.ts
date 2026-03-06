import status from "http-status";
import { AppError } from "../utils/AppError.js";
import { Prisma } from "../db/generated/prisma/client.js";

type PrismaModelDelegate = {
  create(args: any): Promise<any>;
  findUnique(args: any): Promise<any>;
  findMany(args?: any): Promise<any>;
  update(args: any): Promise<any>;
  delete(args: any): Promise<any>;
};
console.log(`inside crud repository`);

export default class CrudRepository<T extends PrismaModelDelegate> {
  protected model: T;

  constructor(model: T) {
    this.model = model;
  }

  async create(data: any) {
    try {
      return await this.model.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new AppError("Resource already exists", status.CONFLICT);
      }

      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      return await this.model.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new AppError("Resource not found", status.NOT_FOUND);
      }

      throw error;
    }
  }

  async findById(id: number) {
    const response = await this.model.findUnique({
      where: { id },
    });
    if (!response) {
      throw new AppError("Not able to find the resource", status.NOT_FOUND);
    }
    return response;
  }

  async findAll() {
    return await this.model.findMany();
  }

  async updateById(id: number, data: any) {
    try {
      return await this.model.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new AppError("Resource not found", status.NOT_FOUND);
      }

      throw error;
    }
  }
}
