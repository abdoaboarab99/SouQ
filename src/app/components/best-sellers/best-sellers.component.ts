
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  discount: string;
  quantity: number;
}

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:3000/bestsellers') 
      .subscribe((data) => {
        this.products = data;
      });
  }
}
