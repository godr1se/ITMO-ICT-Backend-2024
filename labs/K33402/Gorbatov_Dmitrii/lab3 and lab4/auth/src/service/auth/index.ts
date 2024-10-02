import User, { UserAttributes } from "../../models/users";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import hashPas from '../../utilis/hashPas';

export default class AuthService {

    async register(userData: UserAttributes): Promise<{ id: number } | Error> {
        try {
            const hashedPassword = hashPas(userData.password);
            const result = await User.create({ ...userData, password: hashedPassword });
            return { id: result.id };
        } catch (err) {
            console.error("Registration error:", err);
            throw new Error("Failed to register user");
        }
    }

    async auth(email: string, password: string): Promise<{ token: string } | Error> {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Email or password is incorrect');
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "TEST_MARKET_FOR_LESSON", { expiresIn: "1d" });
            return { token };
        } catch (err) {
            console.error("Authentication error:", err);
            throw new Error('Authentication failed');
        }
    }
}
