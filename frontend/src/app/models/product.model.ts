import { Category } from "./category.model";
import { OrderDetails } from "./order-details.model";
import { ProductImage } from "./product-image.model";

export class Product {
    amountAvailable: number = 0;
    categoryId: number = 0;
    category: Category = new Category();
    dateAdded: Date = new Date();
    description: string = '';
    name: string = '';
    orderDetails: OrderDetails[] = [];
    popularity:number = 0;
    price: number = 0;
    productId = 0;
    productImages: ProductImage[] = [];
    weight: number = 0;
}