import { Controller, Get, UseGuards } from '@nestjs/common';

// @UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
    @Get()
    fetchProducts() {
        return []
    }
}
