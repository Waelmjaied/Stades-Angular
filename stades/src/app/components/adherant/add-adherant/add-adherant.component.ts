import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-adherant',
  templateUrl: './add-adherant.component.html',
  styleUrls: ['./add-adherant.component.css']
})
export class AddAdherantComponent {
  newAdherant = { nom: '', email: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  addAdherant(): void {
    if (!this.newAdherant.nom || !this.newAdherant.email) {
      this.errorMessage = 'Nom and Email are required.';
      return;
    }

    this.adminService.addAdherant(this.newAdherant).subscribe(
      () => {
        this.successMessage = 'Adhérant added successfully.';
        this.router.navigate(['/adherants']); // Redirect to adherants list
      },
      (error) => {
        console.error('Error adding adherant:', error);
        this.errorMessage = 'Failed to add adherant.';
      }
    );
  }
}
