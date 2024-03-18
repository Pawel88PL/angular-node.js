import { Category } from "./category.model";
import { ProductImage } from "./product-image.model";
import { OrderDetails } from "./order-details.model";

export class Product {
    amountAvailable = 0;
    CategoryId?: number;
    CategoryName?: string;
    dateAdded?: Date;
    description?: string;
    Name: string = '';
    orderDetails?: OrderDetails[];
    popularity = 0;
    Price: number = 0;
    priority = 0;
    ProductId = 0;
    ImagePath: string = '';
    weight = 0;
}