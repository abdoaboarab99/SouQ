import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'http://localhost:3000/products';
  private bestsellersUrl = 'http://localhost:3000/bestsellers';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl).pipe(catchError(this.handleError));
  }

  getBestsellers(): Observable<any[]> {
    return this.http.get<any[]>(this.bestsellersUrl).pipe(catchError(this.handleError));
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.productsUrl, product).pipe(catchError(this.handleError));
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.productsUrl}/${id}`, product).pipe(catchError(this.handleError));
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.productsUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addBestseller(bestseller: any): Observable<any> {
    return this.http.post<any>(this.bestsellersUrl, bestseller).pipe(catchError(this.handleError));
  }

  updateBestseller(id: string, bestseller: any): Observable<any> {
    return this.http.put<any>(`${this.bestsellersUrl}/${id}`, bestseller).pipe(catchError(this.handleError));
  }

  deleteBestseller(id: string): Observable<any> {
    return this.http.delete<any>(`${this.bestsellersUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
