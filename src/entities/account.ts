export class User {
    id: string
    balance: number
    userId: string

    constructor(
        id: string,
        userId: string,  
    ) {
        this.id = id
        this.balance = 0
        this.userId = userId
    }
}