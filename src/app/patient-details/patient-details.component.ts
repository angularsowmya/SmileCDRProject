import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { PatientService } from '../Service/patient.service';
import {
  ParentErrorStateMatcher,
} from '../validators/password.validator';
import { Patient } from '../Models/patient';
import { QuestionnaireModel } from '../Models/questionaireModel';
import { MatRadioChange } from '@angular/material/radio';
import { PatientQuestionnaire } from '../Models/patient-questionnaire';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientDetailsDisplayComponent } from '../patient-details-display/patient-details-display.component';


@Component({
  selector: 'app-patient-details-page',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  myPatient: Patient;
  myquestionnaireModel: QuestionnaireModel;
  genderSelection: string;
  allergiesSelection: string;
  selectedAllergy: string;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  genders = ['Male', 'Female', 'Other'];
  martialStatusOptions = ['Married', 'Single', 'Divorced'];
  patientQuestionnaireDetails = new Array<PatientQuestionnaire>();;
  allergyOptions = [
    {
      id :'allergy-true',
      name : 'True',
      value : 1
    },
    {
      id :'allergy-false',
      name : 'False',
      value : 0
    }
  ];
  smokeOptions = [
    {
      id :'smoke-true',
      name : 'True',
      value : 1
    },
    {
      id :'smoke-false',
      name : 'False',
      value : 0
    }
  ];
  alchoholOptions = [
    {
      id :'alchohol-true',
      name : 'True',
      value : 1
    },
    {
      id :'alchohol-false',
      name : 'False',
      value : 0
    }
  ];
  validation_messages = {
    birthCountryValidation: [{ type: 'required', message: 'Birth Country is required' }],
    bioValidation: [
      {
        type: 'maxlength',
        message: 'Bio cannot be more than 256 characters long',
      },
    ],
    genderValidation: [{ type: 'required', message: 'Please select your Gender' }],
    maritalstatusValidation: [{ type: 'required', message: 'Please select your Marital Status' }],
    birthDayValidation: [{ type: 'required', message: 'Please Provide your Birthday' }],
    allergyValidation: [{ type: 'required', message: 'Please Provide your  allergy Information' }],
  };


  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.createForms();
  }

  getPatientDetails() {
    this.patientService.patientDetails().subscribe((patient: Patient) => {
      this.myPatient = patient;
    });
  }

  createForms() {
      // user details form validations
    this.userDetailsForm = this.fb.group({
      fullName: ['Sowmya Bantupalli', Validators.required],
      bio: ['bio', Validators.required],
      birthCountry: ['', Validators.required],
      birthDay: ['', Validators.required],
      genderSelection:  ['', Validators.required],
      maritalstatus: ['', Validators.required],    
      allergiesSelection: new FormGroup({
        allergyTrue: new FormControl(true),
        allergyFalse: new FormControl(false),
      }), 
      smokeSelection: new FormGroup({
        smokeTrue: new FormControl(true),
        smokeFalse: new FormControl(false),
      }), 
      alchoholSelection: new FormGroup({
        alchoholTrue: new FormControl(true),
        alchoholFalse: new FormControl(false),
      }) 
    });
  }

  allergyChange($event: MatRadioChange){
    if ($event.source.id === 'allergy-true') {
      this.userDetailsForm.controls.allergiesSelection.setValue({
        allergyTrue: new FormControl(true),
        allergyFalse: new FormControl(false),
      }) 
  }
  else if($event.source.id === 'allergy-false'){
    this.userDetailsForm.controls.allergiesSelection.setValue({
      allergyTrue: new FormControl(false),
      allergyFalse: new FormControl(true),
    }) 
  }
  }

  smokeChange($event: MatRadioChange){
    if ($event.source.id === 'smoke-true') {
      this.userDetailsForm.controls.smokeSelection.setValue({
        smokeTrue: new FormControl(true),
        smokeFalse: new FormControl(false),
      }) 
  }
  else if($event.source.id === 'smoke-false'){
    this.userDetailsForm.controls.smokeSelection.setValue({
      smokeTrue: new FormControl(false),
      smokeFalse: new FormControl(true),
    }) 
  }
  }

  alchoholChange($event: MatRadioChange){
    if ($event.source.id === 'alchohol-true') {
      this.userDetailsForm.controls.alchoholSelection.setValue({
        alchoholTrue: new FormControl(true),
        alchoholFalse: new FormControl(false),
      }) 
  }
  else if($event.source.id === 'alchohol-false'){
    this.userDetailsForm.controls.alchoholSelection.setValue({
      alchoholTrue: new FormControl(false),
      alchoholFalse: new FormControl(true),
    }) 
  }
  }

  openDialog(patientQuestionnaireDetails : PatientQuestionnaire[]): void {
    const dialogRef = this.dialog.open(PatientDetailsDisplayComponent, {
      width: '800px',
      data: patientQuestionnaireDetails
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  setPatientQuestionnaire(sno : number, question : string, answer : string) : PatientQuestionnaire{
    const patientQuestionnaire = new PatientQuestionnaire();
    patientQuestionnaire.sno = sno;
    patientQuestionnaire.question = question;
    patientQuestionnaire.answer = answer;
    return patientQuestionnaire;
  }

  onSubmitUserDetails(value: any) {
    console.log(value);
   
    this.patientQuestionnaireDetails = [];
    this.patientQuestionnaireDetails.push(this.setPatientQuestionnaire( 1, 'Do you have allergies?', value?.allergiesSelection?.allergyTrue?.value ? "True" : "False"));
    this.patientQuestionnaireDetails.push(this.setPatientQuestionnaire( 2, 'What is your gender?', value?.genderSelection));
    this.patientQuestionnaireDetails.push(this.setPatientQuestionnaire( 3, 'What is your date of birth?', value?.birthDay?.toDateString()));
    this.patientQuestionnaireDetails.push(this.setPatientQuestionnaire( 4, 'What is your country of birth?', value?.birthCountry));
    this.patientQuestionnaireDetails.push(this.setPatientQuestionnaire( 5, 'What is your marital status?', value?.maritalstatus));
    this.patientQuestionnaireDetails.push(this.setPatientQuestionnaire( 6, 'Do you smoke?', value?.smokeSelection?.smokeTrue?.value ? "True" : "False"));
    this.patientQuestionnaireDetails.push(this.setPatientQuestionnaire( 7, 'Do you drink alchohol?', value?.alchoholSelection?.alchoholTrue?.value ? "True" : "False"));
    this.openDialog(this.patientQuestionnaireDetails);
  }
}
