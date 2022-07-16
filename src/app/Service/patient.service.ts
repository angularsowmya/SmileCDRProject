import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionnaireModel } from '../Models/questionaireModel';

@Injectable({
  providedIn: 'root'
})

export class PatientService {
// URL which returns list of JSON items (API end-point URL)
  private readonly URL = 'https://try.smilecdr.com/baseR4/Patient';
  private readonly questionnaire = '../Assets/questionnaire.json';
  myquestionnaireModel : QuestionnaireModel;
constructor(private http: HttpClient) {
  this.getQuestionnaire();
 }

 getQuestionnaire(){
  // this.http.get('/Assets/questionnaire.json').subscribe(
  //   data => {
  //     console.log (data);
  //     //  console.log(this.arrBirds[1]);
  //   },
  //   (err) => {
  //     console.log (err);
  //   }
  // );
  const post$:Observable<QuestionnaireModel> = this.http.get<QuestionnaireModel>('/Assets/questionnaire.json');
  post$.subscribe( post=>{
    this.myquestionnaireModel = post;
    console.log(this.myquestionnaireModel);
  });
}
 
// create a method named: patientDetails()
  // this method returns list-of-pstient-details in form of Observable
  // every HTTTP call returns Observable object
  patientDetails(): Observable<any> {
    console.log('Request is sent!');
    // Using the POST method
    const headers = new HttpHeaders();
    const utcOffset = -(new Date().getTimezoneOffset());
    headers.append('Content-Type', 'application/json');
    headers.append('utc-offset', utcOffset.toString());
    headers.append('platform', 'WEB');
    headers.append('app-version', '1.00');
    headers.append('version', '1.0');
    headers.append('accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   
    return this.http.get<any>(this.URL, { headers: headers } )
  }
}


