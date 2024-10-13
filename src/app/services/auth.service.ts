import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartService } from './cart.service'; // Import CartService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private userRole: string | null = null;
  private currentUserSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private apiUrl = 'http://localhost:3000/users'; // JSON server URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService 
  ) {}
  islookedin:boolean=false

  signup(data: any): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const highestId = users.reduce((max, user) => user.id > max ? user.id : max, 0);
        return highestId + 1;
      }),
      switchMap(nextId => {
        const newUser = { id: nextId, name: data.name, username: data.username, password: data.password, role: 'User' };
        return this.http.post(this.apiUrl, newUser).pipe(
          map(() => true),
          catchError(error => {
            console.error('Signup error', error);
            return of(false);
          })
        );
      }),
      catchError(() => of(false))
    );
  }

  login(email: string, password: string): Observable<boolean> {
    this.islookedin=true;
    const userId = 'some-unique-user-id'; // Obtain this from your authentication system
    localStorage.setItem('userId', userId);
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0]; // Assuming email is unique
          this.token = 'user-token'; // Simulated token; replace with real token logic as needed
          this.userRole = user.role; // Save the user role
          this.currentUserSubject.next({ name: user.name, email: user.email, role: user.role }); // Emit the current user
          return true;
        } else {
          this.resetUser(); // Reset user if not found
          return false;
        }
      }),
      catchError(error => {
        console.error('Login error', error);
        this.resetUser(); // Reset user on error
        return of(false); // Return false on error
      })
    );
  }

  private resetUser() {
    this.token = null;
    this.userRole = 'guest';
    this.currentUserSubject.next(null); // Emit null for no user
  }

  getCurrentUser(): Observable<any | null> {
    return this.currentUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  getUserRole(): string {
    return this.userRole || 'guest';
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  logout(): void {
    this.resetUser(); // Clear the current user on logout
    this.cartService.clearCart(); // Clear the cart on logout
    this.router.navigate(['/']); // Navigate to the home page
  }
}
