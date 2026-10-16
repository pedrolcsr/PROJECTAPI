var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductSituation } from "./ProductSituations.js";
import { ProductCategory } from "./ProductCategories.js";
let Product = class Product {
    id;
    name;
    productCategory;
    productSituation;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    ManyToOne(() => ProductCategory, (productCategory) => productCategory.products),
    JoinColumn({ name: "productCategoryId" }),
    __metadata("design:type", Object)
], Product.prototype, "productCategory", void 0);
__decorate([
    ManyToOne(() => ProductSituation, (productSituation) => productSituation.products),
    JoinColumn({ name: "productSituationId" }),
    __metadata("design:type", Object)
], Product.prototype, "productSituation", void 0);
__decorate([
    Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
Product = __decorate([
    Entity("products")
], Product);
export { Product };
//# sourceMappingURL=Products.js.map