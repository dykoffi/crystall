import prisma from "../../configs/db";
import { Activity } from "@prisma/client";
import PTypes, { BatchPayload } from "../../configs/db/types"

class ActivityService {

    constructor() { }

    // Methods for creating User

    async addOne(data: PTypes.ActivityCreateInput): Promise<Activity> {
        return prisma.activity.create({ data });
    }

    // Methods for get User information

    async getAll(args: PTypes.ActivityFindManyArgs): Promise<Array<Activity>> {
        return prisma.activity.findMany(args);
    }

    async getById(id: number): Promise<Activity | null> {
        return prisma.activity.findUnique({ where: { id_: id } });
    }

    // Methods for updating User information

    async updateById(id: number, args: PTypes.ActivityUpdateInput): Promise<Activity> {
        return prisma.activity.update({ where: { id_: id }, data: args });
    }

    // Methods for deleting USer

    async deleteAll(): Promise<BatchPayload> {
        return prisma.activity.deleteMany({});
    }

    async deleteById(id: number): Promise<Activity> {
        return prisma.activity.delete({ where: { id_: id } });
    }

}

export default ActivityService;