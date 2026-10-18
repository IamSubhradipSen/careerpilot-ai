import authRepository from "./auth.repository.js";
import { comparePassword, hashPassword } from "../../shared/security/hash.js";
import { generateToken } from "../../shared/security/jwt.js";
class AuthService {
    async register(data) {
        const existingUser = await authRepository.findUserByEmail(data.email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await hashPassword(data.password);
        const user = await authRepository.createUser({
            ...data,
            password: hashedPassword,
        });
        return user;
    }
    async login(data) {
        const user = await authRepository.findUserByEmail(data.email);
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await comparePassword(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        const token = generateToken({
            id: user.id,
            email: user.email,
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
    async getCurrentUser(userId) {
        const user = await authRepository.findUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}
export default new AuthService();
