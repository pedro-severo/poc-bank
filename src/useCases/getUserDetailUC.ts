import { User } from "../entities/user";
import Container, { Service } from 'typedi';
import { UserDatabase } from '../services/database/user/userDatabase';

@Service()
// @ts-ignore
export class GetUserDetailUC {
    userDb: UserDatabase

    constructor() {
        this.userDb = Container.get(UserDatabase)
    }
    
    // TODO: to type response
    async execute(userId: string): Promise<User> {
        try {
            const user = await this.userDb.getUserById(userId)
            return user
        } catch (err) {
            throw new Error("");
        }
    }
}