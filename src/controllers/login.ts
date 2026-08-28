//import express, { Request, Response } from "express";

import express from "express";
import type { Request, Response } from "express";

import { AppDataSource } from "../data-source.js";

const router =express.Router()

AppDataSource.initialize().then(()=> {
        console.log("Conexão do banco de dados realizada com sucesso!")
}).catch((error)=>{
        console.log("Erro na conexão com o banco de dados!",error)
})

router.get("/", (req: Request, res: Response)=>{
        res.send("Hello World! tela de login")
})


export default router