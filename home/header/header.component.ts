import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule ,Form, FormGroup, Validators ,FormControl,Validator } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
import { RouterModule, Routes, Router, ActivatedRoute}  from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { LaravelRoutesService } from '../../services/laravel-routes.service';
import { CartService } from '../../services/cart.service';
import { Subscription }   from 'rxjs/Subscription';
import { HomeService } from '../../home.service';
import { Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Meta , Title } from '@angular/platform-browser';


declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

  styleUrls: ['./header.component.css']
 
})
export class HeaderComponent implements OnInit {
  
      search:string;
      //postsArray: Filter[];
      cat_arr :any[];
      jsonResponse : string;
      currenydataArray :any;
      finalCurrency:any;
      form: FormGroup;
      searchstr: FormGroup;
	  sortby:any;
	  perPage:any;
	  current_page:any;
      mycss :boolean = false;
      closedialog :boolean = true;

      public prev= [];
      previous:any;
      ask:any;
      public shouldShow :boolean = false;
      public passshouldShow :boolean = false;
      public closepopup :boolean = true;
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
	  
      
      subscription:any;

      currencyObj : any;
      currencyrerer:any;
      currency: string;
      n:any;
      showDropDown: boolean;
      displayddl: string;
      tokenkey:any;
      newSess:any;
      public ctype = '';

      
  constructor( private http: Http,  private router: Router , private filterService : FilterService, private homeservice: HomeService, 
    private cartservice : CartService, private meta: Meta , private pagenproduct : LaravelRoutesService, private title:Title, private route: Router, private routerQ : ActivatedRoute) { 
     
    }
   
  ngOnInit() {


    this.pagenproduct.metaTitleObservable$.subscribe(  res => {
      this.title.setTitle(res);
     });

    this.pagenproduct.metaDescObservable$.subscribe(  res => {
       this.meta.addTag({ name: 'description', content: res });
    });

     this.getCurrencyw = this.homeservice.getCustomerToken().subscribe(
      (response) => {
        localStorage.setItem('tokenid',response.tokenid);
        localStorage.setItem('tokenkey',response.tokenkey);
      this.tokenid = localStorage.getItem('tokenid');
      this.tokenkey = localStorage.getItem('tokenkey');
      
      
      this.currenciesAll = response.currenciesAll;
      this.customer_currency = JSON.parse(response.customer_currency);
      //console.log(this.customer_currency);
      this.currency =JSON.stringify(this.customer_currency.id);
     
      },
      (error: Response) => console.log(error)
    );

    this.form = new FormGroup({
      
      email: new FormControl('',[Validators.required,Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.minLength(7)]),
      password: new FormControl('',Validators.required),
      
    });

    this.searchstr = new FormGroup({
      
      substring: new FormControl('')
      
    });

    this.currencyForm =  new FormGroup ({ currency: new FormControl('Pound Sterling')})
  
    let tid =  localStorage.getItem('tokenid');
    let tokenkey =  localStorage.getItem('tokenkey');
    let para = '?tokenid='+tid+'&tokenkey='+tokenkey;

    //this.results = this.homeservice.getcartItems(para);
	
	    this.subscription = this.cartservice.cartDetailForHeaderObservable$.subscribe(
        res => {
         this.results = res;
      });
	
	this.homeservice.getcartItems(para).subscribe( (response) => { this.results = response; } );
	console.log(this.results);
    this.isLoggedin();

  }
  
  onSearchChange(search) {
  	$('#instant_search_menu').show();
    if( search.length > 0){
     this.filterService.getFilter(search)
     .subscribe(
      (cat_arr) => this.cat_arr = cat_arr,
      (error: Response) => console.log(error)
    );

    } else {
      this.cat_arr=[];
    }
    
  }
  
  blankQuickSearch() {
	$('#searchStr').val('');
	$('#instant_search_menu').hide();
  }
  
  onClickedOutside(){
  	$('#instant_search_menu').hide();
  }
  
  focusQuickSearch() {
	$('#instant_search_menu').show();
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
	this.homeservice.logoutCstomer().subscribe( (response) => { this.results = response;console.log(this.results); } );
	
     localStorage.removeItem('cemail');
     localStorage.removeItem('cname');
     localStorage.removeItem('cid');
     localStorage.removeItem('token');
     localStorage.removeItem('tokenid');
     localStorage.removeItem('tokenkey');
    
     this.closepopup = true;
     this.isLoggedin();
     this.router.navigate(['/login.html']);

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
     //this.myclass=true;
    if(this.form.valid){
    let postdata = {
     email:email,
     password:password
     }



     this.http.post("http://127.0.0.1:8000/api/customerlogin/", postdata)
        .map(res => res.json())
         .subscribe(response=>{

         // console.log(response);
           if(response){
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
            this.http.post("http://127.0.0.1:8000/api/customerData/", senddata)
            .map(res => res.json())
            .subscribe(final_response=>{
               let fnaew = final_response;
               let c_id  = fnaew.id;
               let c_email =  fnaew.email;
               let cfname =  fnaew.fname;
               localStorage.setItem('cid',c_id);
               localStorage.setItem('cname',cfname);
               localStorage.setItem('cemail',c_email);
               this.closepopup= false;
               this.form.reset();
          });
          }else{
            let newv11 = response;
           // console.log('error in login');
          
          }
          
        }
      },
    
      err => {if(err.statusText==='Unauthorized'){
        this.loginerror=true;

      }},
     
    );
 
 }else{
   this.mycss = true;
 }
    
  }
    
  onCurrency(currencyFormaaa)
  {
    this.n = currencyFormaaa.value.currency;
    this.homeservice.onFindCurrency(this.n).subscribe();
    window.location.reload();
  }

  manualtoggle(){
    this.showDropDown = !this.showDropDown;
    this.displayddl = this.showDropDown ? "inline" : "none";
  }

  removeOrderItem(id,orderid){
    let tid =  localStorage.getItem('tokenid');
    let tokenkey =  localStorage.getItem('tokenkey');
    let para = '?tokenid='+tid+'&tokenkey='+tokenkey+'&itemId='+id+'&orderid='+orderid;
    this.results = this.homeservice.removeOrderItems(para);
    this.router.navigate(['/cart.html']);
  
  }

  searchSubmit(searchstr){
  	this.routerQ.queryParams.subscribe(params => {
		$(".catLoader").show();
		this.searchstr = searchstr;
		
		if(params['sortby']!='' && params['sortby']!=undefined){
			this.sortby = params['sortby'];
		}else{
			this.sortby = 'recommended-asc';
		}
		
		if(params['perPage']!='' && params['perPage']!=undefined){
			this.perPage = params['perPage'];
		}else{
			this.perPage = 48;
		}
		
		if(params['current_page']!='' && params['current_page']!=undefined){
			this.current_page = params['current_page'];
		}else{
			this.current_page = 1;
		}

		this.route.navigate(['/search.html'], { queryParams: { searchstr: searchstr.value.substring, sortby:this.sortby, perPage:this.perPage, current_page:this.current_page } });
	});
	
  }
}
