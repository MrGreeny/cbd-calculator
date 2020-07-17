import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {

  

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("submit form!")
    this.http.post<any>(
      'https://formspree.io/xayplvzl', 
      { text: 'Its a text', message: 'Do the message' }).subscribe( (data: { next: string, ok: boolean }) => {
        
        console.log(JSON.stringify("respose  data: " + data))
        console.log(data.ok);
        console.log(data.next);

        if (data.ok) {
          console.log('Email sent!')
        }
      })
  }
}


