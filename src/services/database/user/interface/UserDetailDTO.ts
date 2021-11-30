import { BankStatementItemDTO } from './BankStatementItemDTO';

export interface UserDetailDTO {
    id: string,
    name: string,
    age: number,
    cpf: string,
    birthDate: string,
    balance: number,
    user_id: string,
    bankStatement: BankStatementItemDTO[]
}