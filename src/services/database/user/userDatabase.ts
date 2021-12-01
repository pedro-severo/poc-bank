import { Service } from "typedi";
import { User } from "../../../entities/user";
import { mapDateToSqlDate } from "../../../utils/mapDateToSqlDate";
import connection from "../databaseConnection";
import { users } from "../users";
import { UserDetailResponse } from "./interface/UserDetailResponse";
import { mapUserDetailDTOToResponse } from "./mapUserDetailDTOToResponse";

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

    async getUserById(id: string): Promise<UserDetailResponse> {
        try {
            const result =  await connection.raw(`
                SELECT * FROM users user
                JOIN accounts 
                ON user_id=user.id
                WHERE user.id="${id}";
            `)
            const userDetailDTO = result[0][0]
            // TODO: get these arrays below in a common class called Database that are extended in specific databases classes. The method can be named as getBankStatement
            const drafts_and_deposits = await connection("drafts_and_deposits")
                .select("value", "type", "date", "description")
                .where("account_id", userDetailDTO.id)
                .orderBy("date")
            const payments = await connection("payments")
                .select(
                    "value", 
                    "type", 
                    "date", 
                    "description", 
                    "is_a_schedule", 
                    "payment_type"
                )
                .where("account_id", userDetailDTO.id)
                .orderBy("date")
            userDetailDTO.bankStatement = [...drafts_and_deposits, ...payments]
            const userDetailResponse = mapUserDetailDTOToResponse(userDetailDTO)
            return userDetailResponse
        } catch (err) {
            // TODO: implement explanatory error messages 
            throw new Error("")
        }
    }
}