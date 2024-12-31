import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TerrainComponent } from './terrain/terrain.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AdherantsComponent } from './adherants/adherants.component';
import { ReserverComponent } from './reserver/reserver.component';
import { AddTerrainComponent } from './terrain/add-terrain/add-terrain.component';
import { from } from 'rxjs';
import { AddAdherantComponent } from './adherant/add-adherant/add-adherant.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'terrain', component: TerrainComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'reservations' , component : ReservationsComponent} ,
    { path: 'adherants' , component:AdherantsComponent},
    { path: 'reserver' , component:ReserverComponent},
    { path: 'add-terrain', component: AddTerrainComponent },// New route
    { path: 'add-adherant', component: AddAdherantComponent }, // Route for adding adherant


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
