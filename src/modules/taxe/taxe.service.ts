import prisma from "../../configs/db";
import { Taxe } from "@prisma/client";
import PTypes, { BatchPayload } from "../../configs/db/types"

export default class TaxeService {

    constructor() { }

    // Methods for creating User

    async addOne(data: PTypes.TaxeCreateInput): Promise<Taxe> {
        return prisma.taxe.create({ data });
    }

    // Methods for get User information

    async getAll(args: PTypes.TaxeFindManyArgs): Promise<Array<Taxe>> {
        return prisma.taxe.findMany(args);
    }

    async getById(id: number): Promise<Taxe | null> {
        return prisma.taxe.findUnique({ where: { id_: id } });
    }

    // Methods for updating User information

    async updateById(id: number, args: PTypes.TaxeUpdateInput): Promise<Taxe> {
        return prisma.taxe.update({ where: { id_: id }, data: args });
    }

    // Methods for deleting USer

    async deleteAll(): Promise<BatchPayload> {
        return prisma.taxe.deleteMany({});
    }

    async deleteById(id: number): Promise<Taxe> {
        return prisma.taxe.delete({ where: { id_: id } });
    }

}
