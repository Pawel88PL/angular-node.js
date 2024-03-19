import { Category } from "./category.model";
import { OrderDetails } from "./order-details.model";

export class Product {
    amountAvailable: number = 0;
    categoryId: number = 0;
    category: Category = new Category();
    dateAdded: Date = new Date();
    description: string = '';
    imagePath: string = '';
    name: string = '';
    orderDetails: OrderDetails[] = [];
    popularity:number = 0;
    price: number = 0;
    productId = 0;
}