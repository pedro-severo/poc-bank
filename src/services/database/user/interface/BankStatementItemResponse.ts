export interface BankStatementItemResponse {
    value: number,
    type: BankStatementType,
    date: Date,
    description: string

}

export enum  BankStatementType {
    DEPOSIT = "Deposit",
    DRAFT = "Draft",
    PAYMENT = "Payment",
    INTERNAL_TRANSACTION = "Internal Transaction"

}