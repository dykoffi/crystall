import prisma from "../../configs/db";
import { Category } from "@prisma/client";
import PTypes, { BatchPayload } from "../../configs/db/types"

class CategoryService {

    constructor() { }

    // Methods for creating User

    async addOne(data: PTypes.CategoryCreateInput): Promise<Category> {
        return prisma.category.create({ data });
    }

    // Methods for get User information

    async getAll(args: PTypes.CategoryFindManyArgs): Promise<Array<Category>> {
        return prisma.category.findMany(args);
    }

    async getById(id: number): Promise<Category | null> {
        return prisma.category.findUnique({ where: { id_: id } });
    }

    // Methods for updating User information

    async updateById(id: number, args: PTypes.CategoryUpdateInput): Promise<Category> {
        return prisma.category.update({ where: { id_: id }, data: args });
    }

    // Methods for deleting USer

    async deleteAll(): Promise<BatchPayload> {
        return prisma.category.deleteMany({});
    }

    async deleteById(id: number): Promise<Category> {
        return prisma.category.delete({ where: { id_: id } });
    }

}

export default CategoryService;