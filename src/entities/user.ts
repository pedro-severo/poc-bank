import { getAgeByBirthDate } from "../utils/getAgeByBirthDate"
import { GenericBankTransition } from "./abstractEntities/genericBankTransition"

export class User {
    id: string
    name: string
    age: number
    cpf: string
    birthDate: Date
    balance: number
    bankStatement: GenericBankTransition[]

    constructor(
        id: string,
        name: string,
        cpf: string,
        birthDate: Date    
    ) {
        this.id = id
        this.name = name
        this.age = getAgeByBirthDate(birthDate)
        this.cpf = cpf 
        this.birthDate = birthDate
        this.balance = 0
        this.bankStatement = []
    }
}