import { DataService } from './../data.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  emailError: string;

  findParams = [{
    email: "",
    password: ""
  }]

  credentials = [{
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }]

  findEmail = [{
    email: localStorage.getItem('email')
  }]

  constructor(private data: DataService, private router: Router) {}
  
  ngOnInit(): void {
    //Delete old localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  register() {
    //Encode a password
    //Storage a new encoded password and email to localStorage
    localStorage.setItem('email', this.credentials[0].email);
    this.findParams[0].email = this.credentials[0].email;
    localStorage.setItem('password', btoa(this.credentials[0].password));
    this.findParams[0].password = this.credentials[0].password;

    //Search a new user's email in db, maybe he is exist there 
    var findCheker = this.data.findOwnerByEmail(this.findParams);
    
    //Data service for creating a new user, if he wasn't exist earlier
    var dataServiceForNewUser = this.data;
    var credentialsForNewUser = this.credentials;
    var manualRouter = this.router;

    findCheker.onreadystatechange = function() {

      //Check if responce status is 200
      if (this.readyState == 4 && this.status == 200) {
          
        //Get a result about user
        var answer = JSON.parse(findCheker.response);
        console.log(findCheker);

        if(answer.result !== 'user exists'){

          //create new user
          dataServiceForNewUser.createNewOwner(credentialsForNewUser);
          console.log('create new');

          //redirect to home page
          manualRouter.navigate(['/']);
        } else {

          //user exist
          this.emailError = "User exists";
          console.log('user err');
        }
      }
     
    };
  }

}