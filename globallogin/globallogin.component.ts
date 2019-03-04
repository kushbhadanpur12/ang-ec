import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {ReactiveFormsModule ,Form, FormGroup, Validators ,FormControl,Validator } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
import { RouterModule, Routes, Router}  from '@angular/router';
import { HomeService } from '../home.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-globallogin',
  templateUrl: './globallogin.component.html',
  styleUrls: ['./globallogin.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class GloballoginComponent implements OnInit {

     cat_arr :any[];
      jsonResponse : string;
      currenydataArray :any;
      finalCurrency:any;
      form: FormGroup;
      mycss :boolean = false;
      closedialog :boolean = true;

      public prev= [];
      previous:any;
      ask:any;
      public shouldShow :boolean = false;
      public passshouldShow :boolean = false;
      public closepopup :boolean = true;
      public hideaddrbook :boolean = true;
	  resetPassword:boolean;
      
      result = [];
      tokenid:any;
      public customer_currency:any;
      currenciesAll:any;
      results :any;
      profileData :any;
      profileData2 : any;
      profileData3 : any;
      newSession :any;
      currencyForm: FormGroup;
      loginerror :boolean = false;
      email: string ;
      password :string;
      SessionVar: any = [];
      currencyVal: any = [];
      public fC=[];
      postsArray: any;
      getCurrencyw:any;
      currencyData:any;

      currencyObj : any;
      currencyrerer:any;
      currency: string;
	    cemail:any;
      n:any;
      showDropDown: boolean;
      displayddl: string;
      tokenkey:any;
      newSess:any;
      public ctype = '';
  
		@Input() closable = true;
		@Input() visible: boolean;
		@Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
		@Input() againLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor( private http: Http, private router: Router, private homeservice: HomeService, private register: RegistrationService) { }

    ngOnInit() { 
  
     this.form = new FormGroup({
       email: new FormControl('',[Validators.required,Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.minLength(7)]),
       password: new FormControl('',Validators.required),
    });
  
  
   }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  
  checkvalue(){
    let t = this.email;
    if(t =='' || t == undefined){
      this.shouldShow = true;
    }else{
    }

    if(this.password =='' || this.password == undefined){
      this.passshouldShow = true;
    }else{
    }
  }
  
   somethingChanged(){
    if(this.form.get('email').hasError('required') || (!this.form.get('email').hasError('required') && 
    (this.form.get('email').hasError('email'))|| this.form.get('email').hasError('pattern'))){
      this.shouldShow = true;
    }else{
      this.shouldShow = false;
    }

    if(this.form.get('password').hasError('required') ){
      this.passshouldShow = true;
    }else{
      this.passshouldShow = false;
    }

 }
  
   LoginCustomer(form){
    
    let email = form.value.email;
    let password = form.value.password;
    if(this.form.valid){
	
    let postdata = {
		 email:email,
		 password:password
     }
	 
	  this.register.customerLogin(postdata).subscribe( (response) => { response;
	  
		     
              let newv = response;
              let alldata = newv.access_token;
            
          if(alldata!=''){
            let token = alldata;
            localStorage.setItem('token',token);
			
            let senddata = {
              email:email,
              password:password,
              token:alldata
              }
			  
            this.register.customerLoginWithToken(senddata) .subscribe( (final_response) => { final_response; 

			
               let fnaew   =  final_response;
               let c_id    =  fnaew.id;
               let c_email =  fnaew.email;
               let cfname  =  fnaew.fname;
               localStorage.setItem('cid',c_id);
               localStorage.setItem('cname',cfname);
               localStorage.setItem('cemail',c_email);
			          this.cemail = fnaew.email;
               this.form.reset();
               this.hideaddrbook = true;
               this.close();
               console.log(final_response);
          }),
		  
		   err => { 

        console.log(err);
         
				if(err.statusText==='Unauthorized'){
				   this.loginerror=true;
			   }
			 }
		  
          }else{
            let newv11 = response;
          }
          
        }), 
    
      err => { 
				if(err.statusText==='Unauthorized'){
				   this.loginerror=true;
			   }
			 }
 
     
	
	
	
 
 }else{
   this.mycss = true;
 }
    
  }
	 
isLoggedin() {
    if(localStorage.getItem("cemail")){
      var myObj = localStorage.getItem("cemail");
    if(myObj!='' && myObj!=undefined && myObj!=null) {
        this.jsonResponse = myObj;
     return true;
    }else{
      return false;
    }
    }else{
    return false;
    }

  } 


  logout() {
  
    localStorage.removeItem('cemail');
    localStorage.removeItem('cname');
	localStorage.removeItem('user_email');
    localStorage.removeItem('cid');
    localStorage.removeItem('token');
  }
  
  closeGloballogin(){
      this.visible = false;
      this.visibleChange.emit(this.visible);
  }
  
  openGloballogin(){
  
      this.visible = true;
	  this.resetPassword = false;
  }
}