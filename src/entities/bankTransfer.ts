import { User } from "./user"

export class BankTransfer {
    id: string
    value: number
    origin!: User
    destiny!: User

    constructor(
        value: number,
        id: string,
    ) {
        this.id = id 
        this.value = value
    }

}