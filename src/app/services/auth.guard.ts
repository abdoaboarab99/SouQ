import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service'; // Ensure correct import path

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Get the expected role from the route's data
    const expectedRole = route.data['role'];

    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getUserRole();

      // Allow access if the user role matches the expected role or is 'admin'
      if (userRole === expectedRole || userRole === 'admin') {
        return true;
      } else {
        // If the user is not authorized, navigate to the home page
        this.router.navigate(['/home']);
        return false;
      }
    }

    // If the user is not logged in, navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
