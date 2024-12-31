import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const loginData = { username: this.username, password: this.password };

    this.http.post('http://localhost:8082/admin/login', loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/terrain']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
