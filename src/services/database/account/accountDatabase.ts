import { Service } from "typedi";
import { v4 } from "uuid";
import connection from "../databaseConnection";

@Service()
// @ts-ignore
export class AccountDatabase {


    async create(userId: string) {
        try {
            const accountId = v4()
            await connection("accounts").insert({
                id: accountId, 
                balance: 0,
                user_id: userId
            })
        } catch (err) {
            // TODO: implement explanatory error messages 
            throw new Error("");
        }
    }

}