import express from "express";
import { AppDataSource } from "../data-source.js";
import { ProductCategory } from "../entity/ProductCategories.js";
import { PaginationService, PaginationError } from "../services/PaginationService.js";
const router = express.Router();
function getValidId(id) {
    const parsedId = Number(id);
    return Number.isInteger(parsedId) && parsedId > 0
        ? parsedId
        : null;
}
// LISTAR CATEGORIAS
router.get("/product-categories", async (req, res) => {
    try {
        const page = req.query.page === undefined ? 1 : Number(req.query.page);
        const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);
        const repository = AppDataSource.getRepository(ProductCategory);
        const result = await PaginationService.paginate(repository, page, limit, { id: "ASC" });
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof PaginationError) {
            res.status(400).json({ messagem: error.message });
            return;
        }
        console.error(error);
        res.status(500).json({ messagem: "Erro ao listar categorias." });
    }
});
// BUSCAR CATEGORIA POR ID
router.get("/product-categories/:id", async (req, res) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));
        if (id === null) {
            res.status(400).json({ messagem: "ID inválido." });
            return;
        }
        const category = await AppDataSource
            .getRepository(ProductCategory)
            .findOneBy({ id });
        if (!category) {
            res.status(404).json({ messagem: "Categoria não encontrada." });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao consultar categoria." });
    }
});
// CADASTRAR CATEGORIA
router.post("/product-categories", async (req, res) => {
    try {
        const name = req.body?.name;
        if (typeof name !== "string" || !name.trim()) {
            res.status(400).json({ messagem: "O campo name é obrigatório." });
            return;
        }
        const repository = AppDataSource.getRepository(ProductCategory);
        const category = repository.create({ name: name.trim() });
        const savedCategory = await repository.save(category);
        res.status(201).json({
            messagem: "Categoria cadastrada com sucesso!",
            category: savedCategory
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao cadastrar categoria." });
    }
});
// ATUALIZAR CATEGORIA
router.put("/product-categories/:id", async (req, res) => {
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
        const repository = AppDataSource.getRepository(ProductCategory);
        const category = await repository.findOneBy({ id });
        if (!category) {
            res.status(404).json({ messagem: "Categoria não encontrada." });
            return;
        }
        category.name = name.trim();
        const updatedCategory = await repository.save(category);
        res.status(200).json({
            messagem: "Categoria atualizada com sucesso!",
            category: updatedCategory
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao atualizar categoria." });
    }
});
// EXCLUIR CATEGORIA
router.delete("/product-categories/:id", async (req, res) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));
        if (id === null) {
            res.status(400).json({ messagem: "ID inválido." });
            return;
        }
        const repository = AppDataSource.getRepository(ProductCategory);
        const category = await repository.findOneBy({ id });
        if (!category) {
            res.status(404).json({ messagem: "Categoria não encontrada." });
            return;
        }
        await repository.remove(category);
        res.status(200).json({ messagem: "Categoria removida com sucesso!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            messagem: "Erro ao remover categoria. Verifique se existem produtos vinculados."
        });
    }
});
export default router;
//# sourceMappingURL=ProductCategoriesController.js.map