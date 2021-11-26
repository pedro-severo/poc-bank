import 'reflect-metadata';
import express from 'express';
import cors from "cors";
import { createUserHandler } from './src/presentation/createUserHandler';
import { getUsersHandlers } from './src/presentation/getUsersHandler';
import { getUserDetailHandler } from './src/presentation/getUserDetailHandler';
import { bankDraftOrDepositHandler } from './src/presentation/bankDraftOrDepositHandler';
import { paymentHandler } from './src/presentation/paymentHandler';
import { bankTransactionHandler } from './src/presentation/bankTransactionHandler';

const app = express()

app.use(express.json())
app.use(cors())

app.get("/users", getUsersHandlers)
app.post("/user", createUserHandler)
app.get("/user/:id", getUserDetailHandler)
app.put("/accountAction/:accountId", bankDraftOrDepositHandler)
app.put("/payment/:accountId", paymentHandler)
app.put("/transaction/:sourceUserId/:targetUserId", bankTransactionHandler)

app.listen(3003, () => {
    console.log(`Server is running on port 3003`)
})

export default app