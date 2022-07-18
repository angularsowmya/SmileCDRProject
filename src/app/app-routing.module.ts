import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailsDisplayComponent } from './patient-details-display/patient-details-display.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

const routes: Routes = [
    { path: 'patient-details', component: PatientDetailsComponent },
    { path: 'patient-details-display', component: PatientDetailsDisplayComponent }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
