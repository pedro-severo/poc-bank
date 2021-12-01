import { TransitionType } from "../../../entities/abstractEntities/genericBankTransition"
import { BankStatementItemResponse, BankStatementType } from "./interface/BankStatementItemResponse"
import { UserDetailDTO } from "./interface/UserDetailDTO"
import { UserDetailResponse } from "./interface/UserDetailResponse"


export const mapUserDetailDTOToResponse = (userDetailDTO: UserDetailDTO): UserDetailResponse => {
    const { 
        id: accountId, 
        name, 
        age,
        cpf, 
        birthDate: birthDateDTO, 
        balance,
        user_id: userId, 
        bankStatement: bankStatementDTO
    } = userDetailDTO
    const birthDate = new Date(birthDateDTO)
    const bankStatement = bankStatementDTO.map((itemDTO): BankStatementItemResponse => {
        const getType = (): BankStatementType => {
            switch(itemDTO.type) {
                case TransitionType.DEPOSIT: 
                    return BankStatementType.DEPOSIT
                case TransitionType.DRAFT:
                    return BankStatementType.DRAFT
                case TransitionType.INTERNAL_TRANSACTION:
                    return BankStatementType.INTERNAL_TRANSACTION
                case TransitionType.PAYMENT:
                    return BankStatementType.PAYMENT
            }
        }
        return {
            value: itemDTO.value,
            type: getType(),
            date: new Date(itemDTO.date),
            description: itemDTO.description,
            isASchedule: !!itemDTO.is_a_schedule,
            paymentType: itemDTO.payment_type
        }
    }).sort((a , b) => b.date.getTime() - a.date.getTime());
    return {
        accountId,
        userId,
        name,
        age,
        cpf,
        birthDate,
        balance,
        bankStatement
    }
}