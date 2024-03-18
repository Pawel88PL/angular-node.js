import { Category } from "./category.model";
import { ProductImage } from "./product-image.model";
import { OrderDetails } from "./order-details.model";

export class Product {
    AmountAvailable = 0;
    CategoryId?: number;
    CategoryName?: string;
    dateAdded?: Date;
    Description: string = '';
    Name: string = '';
    orderDetails?: OrderDetails[];
    popularity = 0;
    Price: number = 0;
    ProductId = 0;
    ImagePath: string = '';
    weight = 0;
}