import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule ,Form, FormGroup, Validators ,FormControl,Validator } from '@angular/forms';
import { Contact } from "./Contact.model";
import { HttpModule, Http} from '@angular/http';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

mycss :boolean = false;
sentmsg :boolean = false;

public shouldShow1 :boolean = false;
public shouldShow2 :boolean = false;
public shouldShow3 :boolean = false;
public shouldShow4 :boolean = false;


email: string;
name: string;
subject: string;
message : string;

 
form: FormGroup;
  constructor(private http: Http) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      subject: new FormControl('',[Validators.required]),
      message: new FormControl('',[Validators.required]),
    })
  }


  customvalidation(){

    if(this.email =='' || this.email == undefined){
      this.shouldShow1 = true;
    }

    if(this.name =='' || this.name == undefined){
      this.shouldShow2 = true;
    }

    if(this.subject =='' || this.subject == undefined){
      this.shouldShow3 = true;
    }

    if(this.message =='' || this.message == undefined){
      this.shouldShow4 = true;
    }
  }

 somethingChanged(){
    if(this.form.get('email').hasError('required') || (!this.form.get('email').hasError('required') && 
    (this.form.get('email').hasError('email'))|| this.form.get('email').hasError('pattern'))){
      this.shouldShow2 = true;
    }else{
      this.shouldShow2 = false;
    }

    if(this.form.get('name').hasError('name')){
      this.shouldShow1 = true;
    }else{
      this.shouldShow1 = false;
    }

    if(this.form.get('subject').hasError('required') ){
      this.shouldShow3 = true;
    }else{
      this.shouldShow3 = false;
    }

    if(this.form.get('message').hasError('required') ){
      this.shouldShow4 = true;
    }else{
      this.shouldShow4 = false;
    }

 }



  addUser(form){
     let name = form.value.name;
     let email = form.value.email;
     let subject = form.value.subject;
     let message = form.value.message;

    if(this.form.valid){
    let postdata = {
      name:name,
      email:email,
      subject:subject,
      message:message
      
      }

  // console.log(JSON.stringify(postdata));
   this.http.post("http://127.0.0.1:8000/api/contactus/", JSON.stringify(postdata)).subscribe(response=>{
    console.log(response.json());
    if(response.json().status=='true'){

      this.sentmsg= true;
      this.form.reset();
    }else{
      this.sentmsg = false;
    }
   });

  }else{
    this.mycss = true;
  }
    
   }

}
