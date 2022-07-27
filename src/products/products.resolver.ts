import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { QueryDataConfigInput } from "src/commons/graphql/query-data-config.input";
import { IUser } from "src/users/interfaces/user.interface";
import { ProductReservation } from "./dto/product-reservation.type";
import { Product } from "./dto/product.entity";
import { ProductInput } from "./dto/product.input";
import { IProduct } from "./interfaces/product.interface";
import { ProductsService } from "./products.service";

@UseGuards(AuthGuard)
@Resolver()
export class ProductsResolver {
    constructor(private productService: ProductsService) {}

    @Query(returns => [Product])
    async fetchProducts(
        @Args({ name: 'queryDataConfigInput', type: () => QueryDataConfigInput, nullable: true }) queryDataConfigInput: QueryDataConfigInput
    ) {
        return this.productService.findAll(queryDataConfigInput);
    }

    @Mutation(returns => Product)
    async createProduct(
        @Args({ name: 'productInput', type: () => ProductInput }) product: IProduct
    ) {
        const p = await this.productService.insertOne(product);
        return p;
    }

    @Query(returns => Product)
    async fetchProduct(
        @Args({ name: 'id', type: () => ID }) id: Product['id'],
    ): Promise<IProduct> {
        return this.productService.findOneByIdOrFail(id);
    }

    @Query(returns => [ProductReservation])
    async fetchProductsReservations() {
        return this.productService.fetchProductsReservations();
    }
}