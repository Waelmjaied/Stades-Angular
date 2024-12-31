import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-terrain',
  templateUrl: './add-terrain.component.html',
  styleUrls: ['./add-terrain.component.css']
})
export class AddTerrainComponent {
  newTerrain = { nom: '', surface: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  addTerrain(): void {
    if (!this.newTerrain.nom || !this.newTerrain.surface) {
      this.errorMessage = 'Nom and Surface are required.';
      return;
    }

    this.adminService.addTerrain(this.newTerrain).subscribe(
      () => {
        this.successMessage = 'Terrain added successfully.';
        this.router.navigate(['/terrain']); // Redirect to the list of terrains
      },
      (error) => {
        console.error('Error adding terrain:', error);
        this.errorMessage = 'Failed to add terrain.';
      }
    );
  }
}
