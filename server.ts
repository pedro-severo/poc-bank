import express from 'express';
import cors from "cors"
import { CreateUserUC } from './src/useCases/createUserUC';
import { User } from './src/entities/user';
import { users } from './src/data/users';
import { v4 } from 'uuid';

const app = express()

app.use(express.json())
app.use(cors())

app.get("/users", (req, res) => {
    // TODO: create useCase to this
    res.json(users)
})

app.post("/user", async (req, res) => {
    try {
        const { name, cpf, birthDate } = req.body
        const id = v4()
        const user = new User(
            id,
            name,
            cpf,
            birthDate
        )
        const useCase = new CreateUserUC()
        const response = await useCase.execute(user)
        res.json(response)
    } catch (err) {
        res.status(404).json({
            message: 'It was not possible to register this user.',
            error: err,
        })
    }
})


app.listen(3003, () => {
    console.log(`Server is running on port 3003`)
})

export default app