
import express from "express";
import type { Request, Response } from "express";

import * as yup from "yup";
import slugify from "slugify";

import { In, Not } from "typeorm";

import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Products.js";
import { ProductCategory } from "../entity/ProductCategories.js";
import { ProductSituation } from "../entity/ProductSituations.js";

import {
    PaginationService,
    PaginationError
} from "../services/PaginationService.js";

const router = express.Router();

// VALIDAR ID
function getValidId(id: string): number | null {
    const parsedId = Number(id);

    return Number.isInteger(parsedId) && parsedId > 0
        ? parsedId
        : null;
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

        const ids = result.data.map((product) => product.id);

        const products = ids.length > 0
            ? await repository.find({
                where: { id: In(ids) },
                relations: {
                    productCategory: true,
                    productSituation: true
                },
                order: { id: "ASC" }
            })
            : [];

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
        const schema = yup.object({
            name: yup
                .string()
                .required("O campo name é obrigatório.")
                .min(3, "O campo name deve ter pelo menos 3 caracteres.")
                .max(255, "O campo name deve ter no máximo 255 caracteres."),

            slug: yup
                .string()
                .required("O campo slug é obrigatório.")
                .min(3, "O campo slug deve ter pelo menos 3 caracteres.")
                .max(255, "O campo slug deve ter no máximo 255 caracteres."),

            description: yup
                .string()
                .required("O campo description é obrigatório.")
                .min(3, "O campo description deve ter pelo menos 3 caracteres.")
                .max(255, "O campo description deve ter no máximo 255 caracteres."),

            price: yup
                .number()
                .typeError("O campo price deve ser um número.")
                .required("O campo price é obrigatório.")
                .positive("O campo price deve ser um número positivo.")
                .test(
                    "is-decimal",
                    "O campo price deve ter no máximo duas casas decimais.",
                    (value) => value === undefined ||
                        Number(value.toFixed(2)) === value
                ),

            situation: yup
                .number()
                .typeError("O campo situation deve ser um número.")
                .required("O campo situation é obrigatório.")
                .positive("O campo situation deve ser um número positivo.")
                .integer("O campo situation deve ser um número inteiro."),

            category: yup
                .number()
                .typeError("O campo category deve ser um número.")
                .required("O campo category é obrigatório.")
                .positive("O campo category deve ser um número positivo.")
                .integer("O campo category deve ser um número inteiro.")
        });

        const data = await schema.validate(req.body ?? {}, {
            abortEarly: false
        });

        data.slug = slugify(data.slug, {
            lower: true,
            strict: true
        });

        const productRepository = AppDataSource.getRepository(Product);

        const categoryRepository = AppDataSource.getRepository(ProductCategory);

        const situationRepository = AppDataSource.getRepository(ProductSituation);

        // VERIFICAR CATEGORIA
        const category = await categoryRepository.findOneBy({
            id: data.category
        });

        if (!category) {
            res.status(400).json({
                messagem: "Categoria não encontrada."
            });
            return;
        }

        // VERIFICAR SITUAÇÃO
        const situation = await situationRepository.findOneBy({
            id: data.situation
        });

        if (!situation) {
            res.status(400).json({
                messagem: "Situação não encontrada."
            });
            return;
        }

        // VERIFICAR SLUG
        const existingProduct = await productRepository.findOne({
            where: { slug: data.slug }
        });

        if (existingProduct) {
            res.status(400).json({
                messagem: "Já existe um produto com o mesmo slug."
            });
            return;
        }

        // CRIAR PRODUTO
        const newProduct = productRepository.create({
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            productCategory: category,
            productSituation: situation
        });

        await productRepository.save(newProduct);

        res.status(201).json({
            messagem: "Produto cadastrado com sucesso!",
            product: newProduct
        });

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                messagem: error.errors
            });
            return;
        }

        console.error(error);
        res.status(500).json({
            messagem: "Erro ao cadastrar produto."
        });
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

        const schema = yup.object({
            name: yup
                .string()
                .required("O campo name é obrigatório.")
                .min(3, "O campo name deve ter pelo menos 3 caracteres.")
                .max(255, "O campo name deve ter no máximo 255 caracteres."),

            slug: yup
                .string()
                .required("O campo slug é obrigatório.")
                .min(3, "O campo slug deve ter pelo menos 3 caracteres.")
                .max(255, "O campo slug deve ter no máximo 255 caracteres."),

            description: yup
                .string()
                .required("O campo description é obrigatório.")
                .min(3, "O campo description deve ter pelo menos 3 caracteres.")
                .max(255, "O campo description deve ter no máximo 255 caracteres."),

            price: yup
                .number()
                .typeError("O campo price deve ser um número.")
                .required("O campo price é obrigatório.")
                .positive("O campo price deve ser um número positivo.")
                .test(
                    "is-decimal",
                    "O campo price deve ter no máximo duas casas decimais.",
                    (value) => value === undefined ||
                        Number(value.toFixed(2)) === value
                ),

            situation: yup
                .number()
                .typeError("O campo situation deve ser um número.")
                .required("O campo situation é obrigatório.")
                .positive("O campo situation deve ser um número positivo.")
                .integer("O campo situation deve ser um número inteiro."),

            category: yup
                .number()
                .typeError("O campo category deve ser um número.")
                .required("O campo category é obrigatório.")
                .positive("O campo category deve ser um número positivo.")
                .integer("O campo category deve ser um número inteiro.")
        });

        const data = await schema.validate(req.body ?? {}, {
            abortEarly: false
        });

        const productRepository = AppDataSource.getRepository(Product);

        const categoryRepository = AppDataSource.getRepository(ProductCategory);

        const situationRepository = AppDataSource.getRepository(ProductSituation);

        // BUSCAR PRODUTO
        const product = await productRepository.findOneBy({ id });

        if (!product) {
            res.status(404).json({
                messagem: "Produto não encontrado."
            });
            return;
        }

        data.slug = slugify(data.slug, {
            lower: true,
            strict: true
        });

        // VERIFICAR CATEGORIA
        const category = await categoryRepository.findOneBy({
            id: data.category
        });

        if (!category) {
            res.status(400).json({
                messagem: "Categoria não encontrada."
            });
            return;
        }

        // VERIFICAR SITUAÇÃO
        const situation = await situationRepository.findOneBy({
            id: data.situation
        });

        if (!situation) {
            res.status(400).json({
                messagem: "Situação não encontrada."
            });
            return;
        }

        // VERIFICAR SLUG
        const existingProduct = await productRepository.findOne({
            where: {
                slug: data.slug,
                id: Not(id)
            }
        });

        if (existingProduct) {
            res.status(400).json({
                messagem: "Já existe um produto com o mesmo slug."
            });
            return;
        }

        // ATUALIZAR DADOS
        product.name = data.name;
        product.slug = data.slug;
        product.description = data.description;
        product.price = data.price;
        product.productCategory = category;
        product.productSituation = situation;

        const updatedProduct = await productRepository.save(product);

        res.status(200).json({
            messagem: "Produto atualizado com sucesso!",
            product: updatedProduct
        });

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                messagem: error.errors
            });
            return;
        }

        console.error(error);
        res.status(500).json({
            messagem: "Erro ao atualizar produto."
        });
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
            res.status(404).json({
                messagem: "Produto não encontrado."
            });
            return;
        }

        await repository.remove(product);

        res.status(200).json({
            messagem: "Produto removido com sucesso!"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            messagem: "Erro ao remover produto."
        });
    }
});

export default router;
