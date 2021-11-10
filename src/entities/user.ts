import { mapPtBrDateToUsDate } from "../utils/mapPtBrDateToUsDate"

export class User {
    id: string
    name: string
    age: number
    cpf: string
    birthDate: string
    balance: number
    bankStatement: any[]

    constructor(
        id: string,
        name: string,
        cpf: string,
        birthDate: string    
    ) {
        this.id = id
        this.name = name
        this.age = this.getAge(birthDate)
        this.cpf = cpf 
        this.birthDate = birthDate
        this.balance = 0
        this.bankStatement = []
    }

    getAge(ptBrDate: string): number {
        const today = new Date();
        const usDate = mapPtBrDateToUsDate(ptBrDate)
        const birthDate = new Date(usDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}