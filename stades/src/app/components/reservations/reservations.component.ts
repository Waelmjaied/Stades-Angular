import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-terrain',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = []; 
  loading: boolean = false; 
  error: string = ''; 

  constructor(private reservationService: AdminService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.loading = true;
    this.reservationService.getReservations().subscribe(
      (data) => {
        this.reservations = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        this.error = 'Failed to load reservations'; 
        this.loading = false;
      }
    );
  }

  // Method to delete a reservation
  deleteReservation(reservationId: number): void {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.loading = true;
      this.reservationService.deleteReservation(reservationId).subscribe(
        () => {
          // Remove the deleted reservation from the list
          this.reservations = this.reservations.filter(reservation => reservation.id !== reservationId);
          this.loading = false;
        },
        (error) => {
          console.error('Error deleting reservation:', error);
          this.error = 'Failed to delete reservation';
          this.loading = false;
        }
      );
    }
  }
}
