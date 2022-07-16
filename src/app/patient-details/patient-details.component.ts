import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { PatientService } from '../Service/patient.service';
import { Country } from '../validators/country.model';
import {
  ParentErrorStateMatcher,
  PasswordValidator,
} from '../validators/password.validator';
import { PhoneValidator } from '../validators/phone.validator';
import { UsernameValidator } from '../validators/username.validator';
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

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = ['Male', 'Female', 'Other'];

  validation_messages = {
    fullname: [{ type: 'required', message: 'Full name is required' }],
    bio: [
      {
        type: 'maxlength',
        message: 'Bio cannot be more than 256 characters long',
      },
    ],
    gender: [{ type: 'required', message: 'Please select your gender' }],
    birthday: [{ type: 'required', message: 'Please insert your birthday' }],
    phone: [
      { type: 'required', message: 'Phone is required' },
      {
        type: 'validCountryPhone',
        message: 'Phone incorrect for the country selected',
      },
    ],
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
    // country & phone validation
    let birthcountry = new FormControl(this.countries[0], Validators.required);

    let phone = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        PhoneValidator.validCountryPhone(birthcountry),
      ]),
    });

    this.countryPhoneGroup = new FormGroup({
      country: country,
      phone: phone,
    });

    // user details form validations
    this.userDetailsForm = this.fb.group({
      fullname: ['Homero Simpson', Validators.required],
      bio: [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        Validators.maxLength(256),
      ],
      birthday: ['', Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
      countryPhone: this.countryPhoneGroup,
    });

  }

  onSubmitAccountDetails(value: any) {
    console.log(value);
  }

  onSubmitUserDetails(value: any) {
    console.log(value);
  }
}
