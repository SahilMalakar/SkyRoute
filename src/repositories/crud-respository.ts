import { logger } from "../config/logger.js";

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
      logger.error("Error in CrudRepository - create method", error);
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      return await this.model.delete({
        where: { id },
      });
    } catch (error) {
      logger.error("Error in CrudRepository - deleteById method", error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      return await this.model.findUnique({
        where: { id },
      });
    } catch (error) {
      logger.error("Error in CrudRepository - findById method", error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.model.findMany();
    } catch (error) {
      logger.error("Error in CrudRepository - findAll method", error);
      throw error;
    }
  }

  async updateById(id: number, data: any) {
    try {
      return await this.model.update({
        where: { id },
        data,
      });
    } catch (error) {
      logger.error("Error in CrudRepository - updateById method", error);
      throw error;
    }
  }
}
