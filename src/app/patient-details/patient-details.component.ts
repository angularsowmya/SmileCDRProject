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

@Component({
  selector: 'app-patient-details-page',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  matchingPasswordsGroup: FormGroup;
  countryPhoneGroup: FormGroup;
  myPatient: Patient;
  myquestionnaireModel: QuestionnaireModel;
  genderSelection: string;
  allergiesSelection: string;
  //selectedAllergy: string;
 

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = ['Male', 'Female', 'Other'];
  martialStatusOptions = ['Married', 'Single', 'Divorced'];
  allergyOptions = ['True','False'];


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
      allergiesSelection:  ['', Validators.required],    
    });
  }

  onSubmitAccountDetails(value: any) {
    console.log(value);
  }

  onSubmitUserDetails(value: any) {
    console.log(value);
  }
}
