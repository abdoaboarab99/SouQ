import { Component } from '@angular/core';

interface Contact {
  name: string;
  email: string;
  phone: number | null;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact: Contact = {
    name: '',
    email: '',
    phone: null,
    message: ''
  };
  messageSent = false;

  sendEmail() {

    this.messageSent = true;
    this.showMessage();
  }

  showMessage() {
    const messageBox = document.getElementById('successMessage');
    if (messageBox) {
      messageBox.classList.add('show');
      setTimeout(() => {
        messageBox.classList.remove('show');
      }, 3000);
    }
  }
}