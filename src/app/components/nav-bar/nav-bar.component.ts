import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Adjust path as needed
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  currentUser: any;
  userSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}
  islookedin:boolean=false;

  ngOnInit() {
    this.islookedin=this.authService.islookedin
    console.log(this.islookedin)
    // Subscribe to the current user
    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;

    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // Unsubscribe from the current user when the component is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
