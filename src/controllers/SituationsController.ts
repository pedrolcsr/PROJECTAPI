//import express, { Request, Response } from "express";

import express from "express";
import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Situation } from "../entity/Situations.js";



const router = express.Router()



router.get("/situations", (req: Request, res: Response) => {
        res.send("Bem vindo! tela de situações da rota")
})

router.post("/situations", async (req: Request, res: Response) => {

        try {

                var data = req.body;

                const situationRepository = AppDataSource.getRepository(Situation);

                const newSituation = situationRepository.create(data);

                await situationRepository.save(newSituation);

                res.status(201).json({
                        messagem: "Situação cadastrada com sucesso!",
                        situation: newSituation
                });


        } catch (error) {

                res.status(500).json({
                        messagem: "Erro ao cadastrar situação!",

                });



        }
})


export default router