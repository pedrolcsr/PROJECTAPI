
import express from "express";
import type { Request, Response } from "express";

import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Products.js";
import { ProductCategory } from "../entity/ProductCategories.js";
import { ProductSituation } from "../entity/ProductSituations.js";
import {
    PaginationService,
    PaginationError
} from "../services/PaginationService.js";

const router = express.Router();

function getValidId(id: string): number | null {
    const parsedId = Number(id);

    return Number.isInteger(parsedId) && parsedId > 0
        ? parsedId
        : null;
}

function getValidForeignId(value: unknown): number | null {
    if (
        typeof value !== "number" ||
        !Number.isInteger(value) ||
        value < 1
    ) {
        return null;
    }

    return value;
}

// LISTAR PRODUTOS COM PAGINAÇÃO
router.get("/products", async (req: Request, res: Response) => {
    try {
        const page = req.query.page === undefined ? 1 : Number(req.query.page);
        const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);

        const repository = AppDataSource.getRepository(Product);

        const result = await PaginationService.paginate(
            repository,
            page,
            limit,
            { id: "ASC" }
        );

        const products = await repository.find({
            where: result.data.map((product) => ({ id: product.id })),
            relations: {
                productCategory: true,
                productSituation: true
            },
            order: { id: "ASC" }
        });

        res.status(200).json({
            ...result,
            data: products
        });
    } catch (error) {
        if (error instanceof PaginationError) {
            res.status(400).json({ messagem: error.message });
            return;
        }

        console.error(error);
        res.status(500).json({ messagem: "Erro ao listar produtos." });
    }
});

// BUSCAR PRODUTO POR ID
router.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));

        if (id === null) {
            res.status(400).json({ messagem: "ID inválido." });
            return;
        }

        const product = await AppDataSource.getRepository(Product).findOne({
            where: { id },
            relations: {
                productCategory: true,
                productSituation: true
            }
        });

        if (!product) {
            res.status(404).json({ messagem: "Produto não encontrado." });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao consultar produto." });
    }
});

// CADASTRAR PRODUTO
router.post("/products", async (req: Request, res: Response) => {
    try {
        const { name, productCategoryId, productSituationId } = req.body ?? {};

        if (typeof name !== "string" || !name.trim()) {
            res.status(400).json({ messagem: "O campo name é obrigatório." });
            return;
        }

        const categoryId = getValidForeignId(productCategoryId);
        const situationId = getValidForeignId(productSituationId);

        if (categoryId === null || situationId === null) {
            res.status(400).json({
                messagem: "productCategoryId e productSituationId devem ser números inteiros positivos."
            });
            return;
        }

        const categoryRepository = AppDataSource.getRepository(ProductCategory);
        const situationRepository = AppDataSource.getRepository(ProductSituation);

        const category = await categoryRepository.findOneBy({ id: categoryId });
        const situation = await situationRepository.findOneBy({ id: situationId });

        if (!category) {
            res.status(400).json({ messagem: "Categoria de produto não encontrada." });
            return;
        }

        if (!situation) {
            res.status(400).json({ messagem: "Situação de produto não encontrada." });
            return;
        }

        const repository = AppDataSource.getRepository(Product);

        const product = repository.create({
            name: name.trim(),
            productCategory: category,
            productSituation: situation
        });

        const savedProduct = await repository.save(product);

        const createdProduct = await repository.findOne({
            where: { id: savedProduct.id },
            relations: {
                productCategory: true,
                productSituation: true
            }
        });

        res.status(201).json({
            messagem: "Produto cadastrado com sucesso!",
            product: createdProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao cadastrar produto." });
    }
});

// ATUALIZAR PRODUTO
router.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));

        if (id === null) {
            res.status(400).json({ messagem: "ID inválido." });
            return;
        }

        const { name, productCategoryId, productSituationId } = req.body ?? {};

        if (typeof name !== "string" || !name.trim()) {
            res.status(400).json({ messagem: "O campo name é obrigatório." });
            return;
        }

        const categoryId = getValidForeignId(productCategoryId);
        const situationId = getValidForeignId(productSituationId);

        if (categoryId === null || situationId === null) {
            res.status(400).json({
                messagem: "productCategoryId e productSituationId devem ser números inteiros positivos."
            });
            return;
        }

        const repository = AppDataSource.getRepository(Product);
        const product = await repository.findOneBy({ id });

        if (!product) {
            res.status(404).json({ messagem: "Produto não encontrado." });
            return;
        }

        const category = await AppDataSource
            .getRepository(ProductCategory)
            .findOneBy({ id: categoryId });

        if (!category) {
            res.status(400).json({ messagem: "Categoria de produto não encontrada." });
            return;
        }

        const situation = await AppDataSource
            .getRepository(ProductSituation)
            .findOneBy({ id: situationId });

        if (!situation) {
            res.status(400).json({ messagem: "Situação de produto não encontrada." });
            return;
        }

        product.name = name.trim();
        product.productCategory = category;
        product.productSituation = situation;

        await repository.save(product);

        const updatedProduct = await repository.findOne({
            where: { id },
            relations: {
                productCategory: true,
                productSituation: true
            }
        });

        res.status(200).json({
            messagem: "Produto atualizado com sucesso!",
            product: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao atualizar produto." });
    }
});

// EXCLUIR PRODUTO
router.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = getValidId(String(req.params.id ?? ""));

        if (id === null) {
            res.status(400).json({ messagem: "ID inválido." });
            return;
        }

        const repository = AppDataSource.getRepository(Product);
        const product = await repository.findOneBy({ id });

        if (!product) {
            res.status(404).json({ messagem: "Produto não encontrado." });
            return;
        }

        await repository.remove(product);

        res.status(200).json({ messagem: "Produto removido com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ messagem: "Erro ao remover produto." });
    }
});

export default router;
