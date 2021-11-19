import connection from '../../databaseConnection';
import { users } from '../database/users';
import { User } from "../entities/user";
import { mapDateToSqlDate } from '../utils/mapDateToSqlDate';

export class CreateUserUC {

    // TODO: to type response
    async execute(user: User): Promise<any> {
        try {
            return await this.createUser(user)
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
            const {id, name, age, cpf, birthDate, balance, bankStatement } = user
            await connection("users").insert({
                id, 
                name, 
                age, 
                cpf, 
                birthDate: mapDateToSqlDate(birthDate), 
                balance
            })
            return Promise.resolve({
                Success: true,
                Message: "User created successfully",
                Token: "",
            })
        } catch(err) {
            console.log(err)
            throw new Error("It was not possible to create this user.");
        }
    }
}