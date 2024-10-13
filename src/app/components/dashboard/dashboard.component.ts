import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { UserService } from '../../services/user.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  users: any[] = [];
  userSubscription: Subscription | undefined;
  editingUserId: string | null = null; // Track which user is being edited
  updatedUser: any = {}; // Object to hold updated user data

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.loadUsers();
    } else {
      console.error('Access denied: Not an admin.');
    }
  }

  loadUsers() {
    this.userSubscription = this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.loadUsers(); // Refresh the user list after deletion
      },
      error: (err) => {
        console.error('Error deleting user', err);
        alert('Failed to delete user. Please try again.');
      },
    });
  }

  editUser(user: any) {
    this.editingUserId = user.id; // Set the ID of the user being edited
    this.updatedUser = { ...user }; // Populate updatedUser with current user data
  }

  updateUser() {
    if (this.editingUserId !== null) {
      this.userService.updateUser(this.editingUserId, this.updatedUser).subscribe({
        next: () => {
          this.editingUserId = null; // Reset the editing state
          this.loadUsers(); // Refresh the user list after update
        },
        error: (err) => {
          console.error('Error updating user', err);
          alert('Failed to update user. Please try again.');
        },
      });
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
