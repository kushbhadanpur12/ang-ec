import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule ,Form, FormGroup, Validators ,FormControl } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
import { RouterModule, Routes, Router}  from '@angular/router';



//import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],

})

export class FooterComponent implements OnInit {

  mycss :boolean = false;
  sentmsg: boolean = false;
  existmail: boolean = false;
  public subscribermail : string;
   alreadyexist : boolean = false;  
  form: FormGroup;
  localurl = 'http://127.0.0.1:8000/api/';

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    })

    this.isLoggedin();
  }
 

  sendMail(form)
  {
    let emaildata = form.value.email;
    if(this.form.valid){
      let postdata = {
          email:emaildata
       }
 
     this.http.post(this.localurl+"newsletter/", JSON.stringify(postdata)).subscribe(response=>{
    console.log(response.json());
   // });
      if(response.json().status=='true'){
        this.subscribermail = emaildata;
        this.sentmsg= true;
        this.alreadyexist = false;
        this.mycss = false;
        this.form.reset();
      }
      if(response.json().status=='already_exists'){
        this.subscribermail = emaildata;
        this.alreadyexist = true;
        this.sentmsg= false;
        this.mycss = false;
        this.form.reset();
      }
      if(this.form.get('email').hasError('required')){
       // this.alreadyexist = false;
        //this.sentmsg= false;
       // this.mycss = false;
      }

    });
   // console.log('valid data ');
    }else{
      this.mycss = true;
      this.alreadyexist = false;
      this.sentmsg= false;
      console.log('invalid form data ');
    }
  }

  logout() {
    localStorage.removeItem('cemail');
    localStorage.removeItem('cname');
    localStorage.removeItem('cid');
    localStorage.removeItem('token');
  }


 isLoggedin() {
  if(localStorage.getItem("cemail")){
    var myObj = localStorage.getItem("cemail");
  if(myObj!='' && myObj!=undefined && myObj!=null) {
   return true;
  }else{
    return false;
  }
  }else{
  return false;
  }

} 

}
