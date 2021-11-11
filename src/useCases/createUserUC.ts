import { users } from './../data/users';
import { User } from "../entities/user";

export class CreateUserUC {

    // TODO: to type response
    async execute(user: User): Promise<any> {
        try {
            const userAlreadyExist = await this.checkUserExistence(user)
            if (!userAlreadyExist) {
                return await this.createUser(user)
            } else {
                throw new Error("User already exist.");
            }
        } catch (err) {
            throw new Error("");
        }
    }

    // TODO: once database implemented, abstract this methods in a DATABASE class
    private async checkUserExistence(newUser: User) {
        const { cpf } = newUser
        return users.some(user => user.cpf === cpf)
    }
    private async createUser(user: User) {
        try {
            users.push(user)
            return Promise.resolve({
                Success: true,
                Message: "User created successfully",
                Token: "",
            })
        } catch(err) {
            throw new Error("It was not possible to create this user.");
        }
    }
}