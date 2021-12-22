import { Service } from "typedi";
import { User } from "../../../entities/user";
import { mapDateToSqlDate } from "../../../utils/mapDateToSqlDate";
import { CommonDatabase } from "../common/database";
import { UserDetailResponse } from "./interface/UserDetailResponse";
import { mapUserDetailDTOToResponse } from "./mapUserDetailDTOToResponse";

@Service()
export class UserDatabase extends CommonDatabase {


    async create(user: User) {
        try {
            const {id, name, age, cpf, birthDate } = user
            await this.insert("users", {
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
            const users = await CommonDatabase.connection("users")
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
            const result =  await CommonDatabase.connection.raw(`
                SELECT * FROM users user
                JOIN accounts 
                ON user_id=user.id
                WHERE user.id="${id}";
            `)
            const userDetailDTO = result[0][0]
            const bankStatement = await this.getBankStatement(result[0][0].id)
            userDetailDTO.bankStatement = bankStatement
            const userDetailResponse = mapUserDetailDTOToResponse(userDetailDTO)
            return userDetailResponse
        } catch (err) {
            // TODO: implement explanatory error messages 
            throw new Error("")
        }
    }
}