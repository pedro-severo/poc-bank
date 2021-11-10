import { users } from './../data/users';
import { User } from "../entities/user";

export class CreateUserUC {

    // TODO: to type response
    async execute(user: User): Promise<any> {
        try {
            const userAlreadyExist = this.checkUserExistence(user)
            if (!userAlreadyExist) {
                users.push(user)
                return Promise.resolve({
                    Success: true,
                    Message: "User created successfully"
                })
            } else {
                throw new Error("User already exist.");
            }
        } catch (err) {
            throw new Error("");
        }
    }

    checkUserExistence(newUser: User) {
        const { cpf } = newUser
        return users.some(user => user.cpf === cpf)
    }
}