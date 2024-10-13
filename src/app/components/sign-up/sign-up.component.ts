import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  newUser = {
    name: '',
    username: '',
    password: ''
  };
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  messageType = ''; 
  messageText = ''; 

  constructor(private authService: AuthService, private renderer: Renderer2) {}

  signUp(): void {
    if (this.newUser.password !== this.confirmPassword) {
      this.showMessage('Passwords do not match.', 'error');
      return;
    }

    this.authService.signup(this.newUser).subscribe(
      success => {
        if (success) {
          this.showMessage('Sign-up successful!', 'success');
          this.newUser = { name: '', username: '', password: '' }; // Clear form
          this.confirmPassword = ''; // Clear confirm password
        } else {
          this.showMessage('Username already exists or there was an error.', 'error');
        }
      },
      error => {
        this.showMessage('An unexpected error occurred.', 'error');
      }
    );
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.messageText = message;
    this.messageType = type;

    // Get the element by ID based on message type
    const messageBox = document.getElementById(`${type}-message`);
    if (messageBox) {
      this.renderer.setStyle(messageBox, 'opacity', '1');
      setTimeout(() => {
        this.renderer.setStyle(messageBox, 'opacity', '0');
        this.messageType = ''; // Reset message type
        this.messageText = ''; // Reset message text
      }, 3000); // Hide the message after 3 seconds
    }
  }
}
