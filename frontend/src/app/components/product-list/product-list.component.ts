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
        this.products = products;
        this.isLoading = false;
      },
      error => {
        console.error("Błąd podczas pobierania produktów:", error);
        this.isLoading = false;
      }
    );
  }

  get filteredProducts(): Product[] {
    let filtered = !this.selectedCategory ? this.products : this.products.filter(p => p.CategoryId === this.selectedCategory);

    filtered = filtered.sort((a, b) => {
      switch (this.selectedSorting) {
        case 'category': return (a.CategoryId || 0) - (b.CategoryId || 0);
        case 'name_asc': return a.Name?.localeCompare(b.Name || '') || 0;
        case 'price_asc': return a.Price - b.Price;
        case 'price_desc': return b.Price - a.Price;
        case 'available-desc': return b.AmountAvailable - a.AmountAvailable;
        default: return 0;
      }
    });
    return filtered;
  }
}