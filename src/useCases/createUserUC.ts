import { User } from "../entities/user";
import { UserDatabase } from '../services/database/user/userDatabase';
import Container, { Service } from 'typedi';
import { AccountDatabase } from "../services/database/account/accountDatabase";

// TODO: Fix ts-ignore
@Service()
// @ts-ignore
export class CreateUserUC {
    userDb: UserDatabase
    accountDb: AccountDatabase

    constructor() {
        this.userDb = Container.get(UserDatabase)
        this.accountDb = Container.get(AccountDatabase)
    }

    // TODO: to type response
    async execute(user: User): Promise<any> {
        try {
            await this.userDb.create(user)
            await this.accountDb.create(user.id)
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