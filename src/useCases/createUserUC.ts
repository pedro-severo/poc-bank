import { User } from "../entities/user";
import { UserDatabase } from '../services/database/user/userDatabase';
import Container, { Service } from 'typedi';

// TODO: Fix ts-ignore
@Service()
// @ts-ignore
export class CreateUserUC {
    userDb: UserDatabase

    constructor() {
        this.userDb = Container.get(UserDatabase)
    }

    // TODO: to type response
    async execute(user: User): Promise<any> {
        try {
            await this.userDb.create(user)
            return Promise.resolve({
                Success: true,
                Message: "User created successfully",
                Token: "",
            })
        } catch (err) {
            throw new Error("");
        }
    }
}