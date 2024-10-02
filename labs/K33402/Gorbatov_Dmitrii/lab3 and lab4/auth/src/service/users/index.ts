import User, { UserAttributes } from "../../models/users";
import hashPas from "../../utilis/hashPas";

class UserService {

    async getIdWithPassword(id: number): Promise<User | null> {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }

    async getAll(): Promise<User[]> {
        try {
            const result = await User.findAll();
            return result;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }

    async getById(id: number): Promise<User | string> {
        try {
            const result = await User.findByPk(id);
            return result ? result : 'Sorry, your DB is empty';
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }

    async create(userData: UserAttributes): Promise<User | Error> {
        try {
            const hashedPassword = hashPas(userData.password);
            const result = await User.create({ ...userData, password: hashedPassword });
            return result;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async updatePassword(id: number, userData: Pick<UserAttributes, 'password'>): Promise<[number]> {
        try {
            const hashedPassword = hashPas(userData.password);
            const result = await User.update({ password: hashedPassword }, { where: { id } });
            return result;
        } catch (error) {
            console.error("Error updating password:", error);
            throw error;
        }
    }

    async updateEmail(id: number, userData: Pick<UserAttributes, 'email'>): Promise<[number]> {
        try {
            const result = await User.update({ email: userData.email }, { where: { id } });
            return result;
        } catch (error) {
            console.error("Error updating email:", error);
            throw error;
        }
    }


    async delete(id: number): Promise<number | Error> {
        try {
            const result = await User.destroy({ where: { id } });
            return result;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }
}

export default UserService;
