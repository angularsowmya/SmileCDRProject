import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { PatientService } from '../Service/patient.service';
import {
  ParentErrorStateMatcher,
  PasswordValidator,
} from '../validators/password.validator';
import { Patient } from '../Models/patient';
import { QuestionnaireModel } from '../Models/questionaireModel';
import { MatRadioChange } from '@angular/material/radio';


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
    private patientService: PatientService
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


  onSubmitUserDetails(value: FormGroup) {
    console.log(value);
  }
}
