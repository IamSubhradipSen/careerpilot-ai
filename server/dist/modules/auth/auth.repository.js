import prisma from "../../shared/database/prisma.js";
class AuthRepository {
    async findUserByEmail(email) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    async findUserById(id) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
    async createUser(data) {
        return prisma.user.create({
            data,
        });
    }
}
export default new AuthRepository();
