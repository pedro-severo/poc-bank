import { TransitionType } from "../../../../entities/abstractEntities/genericBankTransition";

export interface BankStatementItemDTO {
    value: number,
    type: TransitionType,
    date: string,
    description: string

}