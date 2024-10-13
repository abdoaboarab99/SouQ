// src/app/models/product.model.ts
export interface Product {
  id?: number;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  discount?: string;
  quantity?: number;
  description?: string;
}
