import express from 'express';
import cors from "cors"
import { createUserHandler } from './src/presentation/createUserHandler';
import { getUsersHandlers } from './src/presentation/getUsersHandler';
import { getUserDetailHandler } from './src/presentation/getUserDetailHandler';
import { bankDraftOrDepositHandler } from './src/presentation/bankDraftOrDepositHandler';

const app = express()

app.use(express.json())
app.use(cors())

app.get("/users", getUsersHandlers)
app.post("/user", createUserHandler)
app.get("/user/:id", getUserDetailHandler)
app.put("/accountAction/:userId", bankDraftOrDepositHandler)

app.listen(3003, () => {
    console.log(`Server is running on port 3003`)
})

export default app