import { CreateUserUC } from './../useCases/createUserUC';
import { RequestHandler } from "express";
import { v4 } from "uuid";
import { User } from '../entities/user';
import { mapPtBrDateToUsDate } from '../utils/mapPtBrDateToUsDate';
import Container from 'typedi';

export const createUserHandler: RequestHandler =  async (req, res) => {
    try {
        const { name, cpf, birthDate } = req.body
        const usBirthDate = mapPtBrDateToUsDate(birthDate)
        const id = v4()
        const user = new User(
            id,
            name,
            cpf,
            new Date(usBirthDate)
        )
        const useCase = Container.get(CreateUserUC)
        const response = await useCase.execute(user)
        res.json(response)
    } catch (err) {
        res.status(404).json({
            message: 'It was not possible to register this user.',
            error: err,
        })
    }
}