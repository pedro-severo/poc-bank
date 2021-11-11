import { users } from './../data/users';
import { User } from "../entities/user";

export class GetUserDetailUC {

    // TODO: to type response
    async execute(userId: string): Promise<any> {
        try {
            const user = await this.getUser(userId)
            return user
        } catch (err) {
            throw new Error("");
        }
    }

    // TODO: once database implemented, abstract this methods in a DATABASE class
    private async getUser(id: string): Promise<User> {
        try {
            const user = users.find(user => user.id === id)
            if (user) return user
            else throw new Error("User not found.")
        } catch (err) {
            throw new Error("")
        }
    }
}