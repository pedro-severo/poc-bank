import Container, { Service } from "typedi"
import { User } from "../entities/user"
import { UserDatabase } from "../services/database/user/userDatabase"

@Service()
// @ts-ignore
export class GetUsersUC {
    userDb: UserDatabase

    constructor() {
        this.userDb = Container.get(UserDatabase)
    }

    // TODO: to type response 
    async execute(): Promise<User[]> {
        try {
            const users = await this.userDb.getUsers()
            return users 
        } catch (err) {
            throw new Error("");
        }
    }

}