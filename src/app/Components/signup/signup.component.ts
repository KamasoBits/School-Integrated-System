import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    console.log('Sign Up Data:', userData);
    alert(`Sign up successful!\nUsername: ${this.username}\nEmail: ${this.email}`);
  }
}
