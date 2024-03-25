import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import gsap from 'gsap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  
  isLoading = false;
  products: Product[] = [];
  selectedCategory: number | null = null;
  selectedSorting: string | null = null;
  dbConnectionError: string = '';


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    gsap.from('.product-list', {
      duration: 1,
      x: '100%',
      opacity: 0,
      scale: 0.5,
      delay: 0.5,
      ease: "power1.out"
    });

    gsap.from('.logo', {
      duration: 1,
      x: '-100%',
      opacity: 0,
      scale: 0.5,
      delay: 1.5,
      ease: "power1.out"
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (products) => {
        setTimeout(() => {
          this.isLoading = false;
          this.products = products;
        }, 2000);
      },
      error => {
        console.error("Błąd podczas pobierania produktów:", error);
        this.dbConnectionError = error.message;
        this.isLoading = false;
      }
    );
  }

  get filteredProducts(): Product[] {
    let filtered = !this.selectedCategory ? this.products : this.products.filter(p => p.categoryId === this.selectedCategory);

    filtered = filtered.sort((a, b) => {
      switch (this.selectedSorting) {
        case 'category': return (a.categoryId || 0) - (b.categoryId || 0);
        case 'name_asc': return a.name?.localeCompare(b.name || '') || 0;
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'available-desc': return b.amountAvailable - a.amountAvailable;
        default: return 0;
      }
    });
    return filtered;
  }
}