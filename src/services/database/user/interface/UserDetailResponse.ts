import { BankStatementItemResponse } from './BankStatementItemResponse';

export interface UserDetailResponse {
    accountId: string,
    userId: string,
    name: string,
    age: number,
    cpf: string,
    birthDate: Date,
    balance: number,
    bankStatement: BankStatementItemResponse[]
}

