import express from "express";
import { AppDataSource } from "../data-source.js";
import { ProductSituation } from "../entity/ProductSituations.js";
import { PaginationService, PaginationError } from "../services/PaginationService.js";
const router = express.Router();
function getValidId(id) {
    const parsedId = Number(id);
    return Number.isInteger(parsedId) && parsedId > 0
        ? parsedId
        : null;
}
// LISTAR SITUAÇÕES DOS PRODUTOS
router.get("/product-situations", async (req, res) => {
    try {
        const page = req.query.page === undefined ? 1 : Number(req.query.page);
        const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);
        const repository = AppDataSource.getRepository(ProductSituation);
        const result = await PaginationService.paginate(repository, page, limit, { id: "ASC" });
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof PaginationError) {
            res.status(400).json({ messagem: error.message });
            return;
        }
        console.error(error);
        res.status(500).json({ messagem: "Erro ao listar situações dos produtos." });
    }
});
// BUSCAR SITUAÇÃO POR ID
router.get("/product-situations/:id", async (req, res) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));
        if (id === null) {
            res.status(400).json({ messagem: "ID inválido." });
            return;
        }
        const situation = await AppDataSource
            .getRepository(ProductSituation)
            .findOneBy({ id });
        if (!situation) {
            res.status(404).json({ messagem: "Situação não encontrada." });
            return;
        }
        res.status(200).json(situation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao consultar situação." });
    }
});
// CADASTRAR SITUAÇÃO
router.post("/product-situations", async (req, res) => {
    try {
        const name = req.body?.name;
        if (typeof name !== "string" || !name.trim()) {
            res.status(400).json({ messagem: "O campo name é obrigatório." });
            return;
        }
        const repository = AppDataSource.getRepository(ProductSituation);
        const situation = repository.create({ name: name.trim() });
        const savedSituation = await repository.save(situation);
        res.status(201).json({
            messagem: "Situação cadastrada com sucesso!",
            situation: savedSituation
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao cadastrar situação." });
    }
});
// ATUALIZAR SITUAÇÃO
router.put("/product-situations/:id", async (req, res) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));
        const name = req.body?.name;
        if (id === null) {
            res.status(400).json({ messagem: "ID inválido." });
            return;
        }
        if (typeof name !== "string" || !name.trim()) {
            res.status(400).json({ messagem: "O campo name é obrigatório." });
            return;
        }
        const repository = AppDataSource.getRepository(ProductSituation);
        const situation = await repository.findOneBy({ id });
        if (!situation) {
            res.status(404).json({ messagem: "Situação não encontrada." });
            return;
        }
        situation.name = name.trim();
        const updatedSituation = await repository.save(situation);
        res.status(200).json({
            messagem: "Situação atualizada com sucesso!",
            situation: updatedSituation
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao atualizar situação." });
    }
});
// EXCLUIR SITUAÇÃO
router.delete("/product-situations/:id", async (req, res) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));
        if (id === null) {
            res.status(400).json({ messagem: "ID inválido." });
            return;
        }
        const repository = AppDataSource.getRepository(ProductSituation);
        const situation = await repository.findOneBy({ id });
        if (!situation) {
            res.status(404).json({ messagem: "Situação não encontrada." });
            return;
        }
        await repository.remove(situation);
        res.status(200).json({ messagem: "Situação removida com sucesso!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            messagem: "Erro ao remover situação. Verifique se existem produtos vinculados."
        });
    }
});
export default router;
//# sourceMappingURL=ProductSituationsController.js.map