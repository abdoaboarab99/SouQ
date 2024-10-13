import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  products: any[] = [];
  bestsellers: any[] = [];
  selectedProduct: any = null; // For editing
  selectedBestseller: any = null; // For editing
  newProduct: any = { name: '', discount: '', price: null, originalPrice: null, image: '', quantity: 1 }; // For adding products
  newBestseller: any = { name: '', discount: '', price: null, originalPrice: null, image: '', quantity: 1 }; // For adding bestsellers
  isLoading = false;
  errorMessage: string | null = null; // For error messages

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadBestsellers();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      },
    });
  }

  loadBestsellers(): void {
    this.isLoading = true;
    this.productService.getBestsellers().subscribe({
      next: (data) => {
        this.bestsellers = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load bestsellers.';
        this.isLoading = false;
      },
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: () => this.errorMessage = 'Failed to delete product.'
    });
  }

  deleteBestseller(id: string): void {
    this.productService.deleteBestseller(id).subscribe({
      next: () => this.loadBestsellers(),
      error: () => this.errorMessage = 'Failed to delete bestseller.'
    });
  }

  addProduct(form: NgForm): void {
    if (form.valid) {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.loadProducts();
          form.reset();
        },
        error: () => this.errorMessage = 'Failed to add product.'
      });
    }
  }

  addBestseller(form: NgForm): void {
    if (form.valid) {
      this.productService.addBestseller(this.newBestseller).subscribe({
        next: () => {
          this.loadBestsellers();
          form.reset();
        },
        error: () => this.errorMessage = 'Failed to add bestseller.'
      });
    }
  }

  editProduct(product: any): void {
    this.selectedProduct = { ...product }; // Clone the product for editing
  }

  editBestseller(bestseller: any): void {
    this.selectedBestseller = { ...bestseller }; // Clone the bestseller for editing
  }

  updateProduct(form: NgForm): void {
    if (form.valid && this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.selectedProduct = null; // Clear selection
        },
        error: () => this.errorMessage = 'Failed to update product.'
      });
    }
  }

  updateBestseller(form: NgForm): void {
    if (form.valid && this.selectedBestseller) {
      this.productService.updateBestseller(this.selectedBestseller.id, this.selectedBestseller).subscribe({
        next: () => {
          this.loadBestsellers();
          this.selectedBestseller = null; // Clear selection
        },
        error: () => this.errorMessage = 'Failed to update bestseller.'
      });
    }
  }
}
