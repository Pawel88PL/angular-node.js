import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItemDialogComponent } from '../cart-item-dialog/cart-item-dialog.component';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  apiBaseUrl: string = environment.apiUrl;
  @Input()
  product!: Product;

  constructor(private cartService: CartService, private dialog: MatDialog) {}

  onAddToCart() {
    this.cartService.addToCart(this.product).subscribe(() => {
      const firstImage = this.product.productImages[0].imagePath;
      this.dialog.open(CartItemDialogComponent, {
        maxWidth: '500px',
        data: {
          image: firstImage ? this.apiBaseUrl + firstImage : null,
          name: this.product.name,
          price: this.product.price
        }
      });
    });
  }
}
