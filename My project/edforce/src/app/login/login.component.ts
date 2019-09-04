import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent  implements OnInit {

  findParams = [{
    email: "",
    password: ""
  }]

  credentials = [{
    email: "",
    password: ""
  }]

  constructor(private data: DataService, private router: Router) {}

  ngOnInit() {
    //Delete old localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  login() {
  
    //Encode a password
    //Storage a new encoded password and email to localStorage
    localStorage.setItem('email', this.credentials[0].email);
    this.findParams[0].email = this.credentials[0].email;
    localStorage.setItem('password', btoa(this.credentials[0].password));
    this.findParams[0].password = this.credentials[0].password;

    //Search a new user's email in db, maybe he is exist there 
    var findCheker = this.data.findOwner(this.findParams);
    
    //Data service for creating a new user, if he wasn't exist earlier
    var manualRouter = this.router;

    findCheker.onreadystatechange = function() {

      //Check if responce status is 200
      if (this.readyState == 4 && this.status == 200) {
          
        //Get a result about user
        var answer = JSON.parse(findCheker.response);
        console.log(findCheker);

        if(answer.result === 'user exists'){

          //redirect to home page
          manualRouter.navigate(['/']);
        } else {

          console.log('user err');
        }
      }
     
    };
    
  }

}
