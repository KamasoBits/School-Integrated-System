import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credential: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.credential && this.password) {
      console.log('Login Data:', { credential: this.credential, password: this.password });
      // Navigate to dashboard on successful login
      this.router.navigate(['/dashboard']);
    } else {
      alert('Please enter both credential and password');
    }
  }
}
