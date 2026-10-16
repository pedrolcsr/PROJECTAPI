var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Products.js";
let ProductCategory = class ProductCategory {
    id;
    name;
    createdAt;
    updatedAt;
    products;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductCategory.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ProductCategory.prototype, "name", void 0);
__decorate([
    Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Date)
], ProductCategory.prototype, "createdAt", void 0);
__decorate([
    Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Date)
], ProductCategory.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => Product, (product) => product.productCategory),
    __metadata("design:type", Array)
], ProductCategory.prototype, "products", void 0);
ProductCategory = __decorate([
    Entity("product_categories")
], ProductCategory);
export { ProductCategory };
//# sourceMappingURL=ProductCategories.js.map