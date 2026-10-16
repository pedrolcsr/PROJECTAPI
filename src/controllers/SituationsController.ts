import express from "express";
import type { Request, Response } from "express";

import { AppDataSource } from "../data-source.js";
import { Situation } from "../entity/Situations.js";
import {
    PaginationService,
    PaginationError
} from "../services/PaginationService.js";

const router = express.Router();

function getValidId(id: string): number | null {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId < 1) {
        return null;
    }

    return parsedId;
}

// LISTAR SITUAÇÕES COM PAGINAÇÃO
router.get("/situations", async (req: Request, res: Response) => {
    try {
        const page = req.query.page === undefined
            ? 1
            : Number(req.query.page);

        const limit = req.query.limit === undefined
            ? 10
            : Number(req.query.limit);

        const situationRepository =
            AppDataSource.getRepository(Situation);

        const result = await PaginationService.paginate(
            situationRepository,
            page,
            limit,
            { id: "ASC" }
        );

        res.status(200).json(result);
    } catch (error) {
        if (error instanceof PaginationError) {
            res.status(400).json({
                messagem: error.message
            });
            return;
        }

        console.error(error);

        res.status(500).json({
            messagem: "Erro ao listar situações."
        });
    }
});

// BUSCAR SITUAÇÃO POR ID
router.get("/situations/:id", async (req: Request, res: Response) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));

        if (id === null) {
            res.status(400).json({
                messagem: "ID inválido."
            });
            return;
        }

        const situationRepository =
            AppDataSource.getRepository(Situation);

        const situation = await situationRepository.findOneBy({ id });

        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada."
            });
            return;
        }

        res.status(200).json(situation);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            messagem: "Erro ao consultar situação."
        });
    }
});

// CADASTRAR SITUAÇÃO
router.post("/situations", async (req: Request, res: Response) => {
    try {
        const nameSituation = req.body?.nameSituation;

        if (
            typeof nameSituation !== "string" ||
            nameSituation.trim().length === 0
        ) {
            res.status(400).json({
                messagem: "O campo nameSituation é obrigatório."
            });
            return;
        }

        const situationRepository =
            AppDataSource.getRepository(Situation);

        const newSituation = situationRepository.create({
            nameSituation: nameSituation.trim()
        });

        await situationRepository.save(newSituation);

        res.status(201).json({
            messagem: "Situação cadastrada com sucesso!",
            situation: newSituation
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            messagem: "Erro ao cadastrar situação."
        });
    }
});

// ATUALIZAR SITUAÇÃO
router.put("/situations/:id", async (req: Request, res: Response) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));

        if (id === null) {
            res.status(400).json({
                messagem: "ID inválido."
            });
            return;
        }

        const nameSituation = req.body?.nameSituation;

        if (
            typeof nameSituation !== "string" ||
            nameSituation.trim().length === 0
        ) {
            res.status(400).json({
                messagem: "O campo nameSituation é obrigatório."
            });
            return;
        }

        const situationRepository =
            AppDataSource.getRepository(Situation);

        const situation = await situationRepository.findOneBy({ id });

        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada."
            });
            return;
        }

        situation.nameSituation = nameSituation.trim();

        const updatedSituation =
            await situationRepository.save(situation);

        res.status(200).json({
            messagem: "Situação atualizada com sucesso!",
            situation: updatedSituation
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            messagem: "Erro ao atualizar situação."
        });
    }
});

// EXCLUIR SITUAÇÃO
router.delete("/situations/:id", async (req: Request, res: Response) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));

        if (id === null) {
            res.status(400).json({
                messagem: "ID inválido."
            });
            return;
        }

        const situationRepository =
            AppDataSource.getRepository(Situation);

        const situation = await situationRepository.findOneBy({ id });

        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada."
            });
            return;
        }

        await situationRepository.remove(situation);

        res.status(200).json({
            messagem: "Situação removida com sucesso!"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            messagem: "Erro ao remover situação."
        });
    }
});

export default router;