import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8082/admin';

  constructor(private http: HttpClient) {}

  login(adminData: { id: number; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, adminData);
  }

  getTerrains(): Observable<any> {
    return this.http.get(`${this.baseUrl}/terrain`);
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/resevation`);
  }

 getAdherents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Adherant`);
  }


  addReservation(reservation: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/addReservation`, reservation);
  }

  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/reservation/${reservationId}`);
  }

  deleteTerrain(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/terrain/${reservationId}`);
  }

  //
  addTerrain(terrain: { nom: string; surface: string }): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/terrain`, terrain);
  }

//
deleteAdherent(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/adherent/${id}`);
}

//
addAdherant(adherant: { nom: string; email: string }): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/adherant`, adherant);
}

}
