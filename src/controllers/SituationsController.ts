//import express, { Request, Response } from "express";

import express from "express";
import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Situation } from "../entity/Situations.js";



const router = express.Router()



router.get("/situations", async (req: Request, res: Response) => {

        try{
                const situationRepository = AppDataSource.getRepository(Situation);

                const situations = await situationRepository.find();

                res.status(200).json(situations);
                return;

        }catch (error) {

                   res.status(500).json({
                        messagem: "Erro ao listar situação!",
                });
                return;
        }
        
})

router.get("/situations/:id", async (req: Request, res: Response) => {

        try{
                const { id } = req.params;

                const situationRepository = AppDataSource.getRepository(Situation);

                const situation = await situationRepository.findOneBy({ id: Number(id) });

                if (!situation) {
                        res.status(404).json({
                                messagem: "Situação não encontrada!"
                        });
                        return;
                }

                res.status(200).json(situation);
                return;

        }catch (error) {

                   res.status(500).json({
                        messagem: "Erro ao listar situação!",
                });
                return;
        }
        
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