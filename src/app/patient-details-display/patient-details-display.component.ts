import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientQuestionnaire } from '../Models/patient-questionnaire';


@Component({
  selector: 'app-patient-details-display',
  templateUrl: './patient-details-display.component.html',
  styleUrls: ['./patient-details-display.component.scss']
})
export class PatientDetailsDisplayComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'question', 'answer'];
  dataSource = [];
  patientQuestionnaireDetails : PatientQuestionnaire[];
  
  constructor( public dialogRef: MatDialogRef<PatientDetailsDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public PatientQuestionnaireData: PatientQuestionnaire[])  { }

  ngOnInit(): void {
    this.dataSource = this.PatientQuestionnaireData;
  }
   

}
