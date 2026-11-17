import { AppDataSource } from "../data-source.js";
import { User } from "../entity/Users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export class AuthService {
    userRepository = AppDataSource.getRepository(User);
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error("Usuario ou senha invalidos!");
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error("Usuario ou senha invalidos!");
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return { id: user.id, name: user.name, email: user.email, token };
    }
}
//# sourceMappingURL=AuthService.js.map