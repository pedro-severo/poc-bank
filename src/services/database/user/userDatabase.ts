import { Service } from "typedi";
import { User } from "../../../entities/user";
import { mapDateToSqlDate } from "../../../utils/mapDateToSqlDate";
import connection from "../databaseConnection";

@Service()
// @ts-ignore
export class UserDatabase {


    async create(user: User) {
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
        } catch (err) {
            // TODO: implement explanatory error messages 
            throw new Error("");
        }
    }
}