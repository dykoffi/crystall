import prisma from "../../configs/db";
import { User } from "@prisma/client";
import PTypes, { BatchPayload } from "../../configs/db/types"
import { cryptG, giveToken } from "cqx-secure";

class UserService {

    constructor() { }

    async connect(login: string, pwd: string) {

        let conn = await prisma.connection_.findUnique({ where: { login: cryptG(login) || undefined } })

        if (conn && conn.pwd === cryptG(pwd)) {

            let data = await prisma.user.findUnique({ where: { connectionId_: conn.id_ }, include: { activities_: { include: { taxes_: true } } } })
            if (data) {
                let token = await giveToken(data, "user", "24h")
                return { data, token }
            }

            return { data: null }

        } else {
            return { data: null }
        }

    }

    // Methods for creating User

    async addOne(data: PTypes.UserCreateInput): Promise<User> {
        return prisma.user.create({ data });
    }

    // Methods for get User information

    async getAll(args: PTypes.UserFindManyArgs): Promise<Array<User>> {
        return prisma.user.findMany(args);
    }

    async getById(id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { id_: id } });
    }

    // Methods for updating User information

    async updateById(id: number, args: PTypes.UserUpdateInput): Promise<User> {
        return prisma.user.update({ where: { id_: id }, data: args });
    }

    // Methods for deleting USer

    async deleteAll(): Promise<BatchPayload> {
        return prisma.user.deleteMany({});
    }

    async deleteById(id: number): Promise<User> {
        return prisma.user.delete({ where: { id_: id } });
    }

}

export default UserService;