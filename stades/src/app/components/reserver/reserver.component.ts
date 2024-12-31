import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service'; // Adjust the path according to your structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.component.html',
  styleUrls: ['./reserver.component.css']
})
export class ReserverComponent implements OnInit {
  reservationForm: FormGroup;
  terrains: any[] = [];
  adherants: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService, // Service to handle API calls
    private router: Router
  ) {
    // Initialize the form group with validators
    this.reservationForm = this.fb.group({
      terrainId: ['', Validators.required],
      adherantId: ['', Validators.required],
      date_res: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch terrains and adherants on component initialization
    this.fetchTerrains();
    this.fetchAdherants();
  }

  // Fetch terrains data from the backend
  fetchTerrains(): void {
    this.adminService.getTerrains().subscribe(
      (data) => {
        this.terrains = data;
      },
      (error) => {
        console.error('Error fetching terrains:', error);
        this.errorMessage = 'Failed to load terrains';
      }
    );
  }

  // Fetch adherants data from the backend
  fetchAdherants(): void {
    this.adminService.getAdherents().subscribe(
      (data) => {
        this.adherants = data;
      },
      (error) => {
        console.error('Error fetching adherants:', error);
        this.errorMessage = 'Failed to load adherants';
      }
    );
  }

  // Submit the reservation form
  onSubmit(): void {
    if (this.reservationForm.valid) {
      const reservationData = {
        terrain: { id: this.reservationForm.value.terrainId },
        user: { id: this.reservationForm.value.adherantId },
        date_res: this.reservationForm.value.date_res,
        heure_debut: this.convertTimeToMinutes(this.reservationForm.value.start_time),
        heure_fin: this.convertTimeToMinutes(this.reservationForm.value.end_time)
      };

      this.adminService.addReservation(reservationData).subscribe(
        (response) => {
          // Handle plain text response correctly
          if (typeof response === 'string') {
            console.log('Reservation created successfully:', response);
            this.successMessage = response;  // Use the plain text response
            this.reservationForm.reset(); // Reset the form
          } else {
            console.error('Unexpected response format:', response);
            this.errorMessage = 'Unexpected response format.';
          }
        },
        (error) => {
          console.error('Error creating reservation:', error);
          this.errorMessage = error.error?.message || 'Failed to create reservation';
        }
      );
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }

  // Convert time to minutes for backend compatibility
  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':');
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  }
}
