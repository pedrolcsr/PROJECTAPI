
import { DataSource } from "typeorm";
import { Product } from "../entity/Products.js";
import { ProductCategory } from "../entity/ProductCategories.js";
import { ProductSituation } from "../entity/ProductSituations.js";

export default class CreateProductsSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando a criação de seeds de produtos...");

        const productRepository = dataSource.getRepository(Product);
        const productCategoryRepository = dataSource.getRepository(ProductCategory);
        const productSituationRepository = dataSource.getRepository(ProductSituation);

        const existingCount = await productRepository.count();

        if (existingCount > 0) {
            console.log("Seeds de produtos já foram criadas. Pulando a criação.");
            return;
        }

        const situation = await productSituationRepository.findOneBy({
            id: 1
        });

        if (!situation) {
            console.error(
                "Situação com ID 1 não encontrada. Certifique-se de que as seeds de situações foram criadas antes."
            );
            return;
        }

        const category = await productCategoryRepository.findOneBy({
            id: 1
        });

        if (!category) {
            console.error(
                "Categoria com ID 1 não encontrada. Certifique-se de que as seeds de categorias foram criadas antes."
            );
            return;
        }

        const products = [
            Object.assign(new Product(), {
                id: 1,
                name: "Produto 1",
                slug: "produto-1",
                description: "Descrição do Produto 1",
                price: 10.99,
                productSituation: situation,
                productCategory: category,
            }),

            Object.assign(new Product(), {
                id: 2,
                name: "Produto 2",
                slug: "produto-2",
                description: "Descrição do Produto 2",
                price: 15.99,
                productSituation: situation,
                productCategory: category,
            }),

            Object.assign(new Product(), {
                id: 3,
                name: "Produto 3",
                slug: "produto-3",
                description: "Descrição do Produto 3",
                price: 20.99,
                productSituation: situation,
                productCategory: category,
            }),
        ];

        await productRepository.save(products);

        console.log("Seeds de produtos criadas com sucesso.");
    }
}
