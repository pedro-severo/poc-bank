import { Service } from "typedi";
import { User } from "../../../entities/user";
import { mapDateToSqlDate } from "../../../utils/mapDateToSqlDate";
import connection from "../databaseConnection";

@Service()
// @ts-ignore
export class UserDatabase {


    async create(user: User) {
        try {
            const {id, name, age, cpf, birthDate, bankStatement } = user
            await connection("users").insert({
                id, 
                name, 
                age, 
                cpf, 
                birthDate: mapDateToSqlDate(birthDate)
            })
        } catch (err) {
            // TODO: implement explanatory error messages 
            throw new Error("");
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            const users = await connection("users")
                .select("name", "balance", "age")
                .innerJoin('accounts', 'accounts.balance', 'accounts.user_id')
            return users
        } catch (err) {
            // TODO: implement explanatory error messages 
            throw new Error("");
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const user =  await connection.raw(`
                SELECT * FROM users user
                JOIN accounts 
                ON user_id=user.id
                WHERE user.id="${id}";
            `)
            return user[0]
        } catch (err) {
            throw new Error("")
        }
    }
}