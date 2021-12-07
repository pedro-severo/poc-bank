import { getAgeByBirthDate } from "../utils/getAgeByBirthDate"

export class User {
    id: string
    name: string
    age: number
    cpf: string
    birthDate: Date

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
    }
}