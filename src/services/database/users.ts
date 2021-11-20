import { User } from '../../entities/user';

export const users: User[] = [
    {
        "id": "904eca09-c92f-46af-a512-e0b917a36492",
        "name": "Augusto Carrara",
        "age": 46,
        "cpf": "000.000.000-01",
        "birthDate": new Date("1974-12-06T03:00:00.000Z"),        
        "balance": 60,
        "bankStatement": []
    },
    {
        "id": "0eb633cf-5309-47ff-911d-d2d78a555a62",
        "name": "Maria do Carmo",
        "age": 76,
        "cpf": "000.000.000-02",
        "birthDate": new Date("1944-7-16T03:00:00.000Z"),
        "balance": 0,
        "bankStatement": []
    },
    {
        "id": "c7288786-7127-4fd0-95d8-e4be264c11d0",
        "name": "José Alfredo",
        "age": 60,
        "cpf": "000.000.000-03",
        "birthDate": new Date("1960-12-06T03:00:00.000Z"),
        "balance": 100,
        "bankStatement": []
    }
]