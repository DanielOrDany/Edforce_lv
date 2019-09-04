import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  contact: string;
  position: number;
  code: string;
  result: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, contact: 'Hydrogen', code: 'code', result: 'H'}
  ];

  displayedColumns: string[] = ['position', 'contact', 'code', 'result'];
  dataSource = this.ELEMENT_DATA;
  
  findParams = [{
    email: "",
    password: ""
  }]

  users: Object;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    var add_position = this.ELEMENT_DATA.length;
    this.findParams[0].email = localStorage.getItem('email');
    this.findParams[0].password = localStorage.getItem('password');

    //CHECK IF USER IS LOGGED
    var manualRouter = this.router;
    //Search a new user in db, maybe he is exist there 
    var findCheker = this.data.findOwnerByEmail(this.findParams);
    findCheker.onreadystatechange = function() {

      //Check if responce status is 200
      if (this.readyState == 4 && this.status == 200) {

        //Get a result about user
        var answer = JSON.parse(findCheker.response);

        if(answer.result !== 'user exists'){

          //redirect to login
          manualRouter.navigate(['/login']);
        }
      }
     
    };
    var results = this.ELEMENT_DATA;
    var findCheker = this.data.getResults(this.findParams[0].email);
    console.log('yes');
    findCheker.onreadystatechange = function() {

      //Check if responce status is 200
      if (this.readyState == 4 && this.status == 200) {
          
        //Get a result about user
        var rows = JSON.parse(findCheker.response);
        console.log(rows);
        
        for (var row = 0; row < rows.result.length; row++){
          var add_contact_data = rows.result[row].contact_data;
          var add_result = rows.result[row].result;
          var add_test_code = rows.result[row].test_code;
          results.push({position: add_position, contact: add_contact_data, code: add_test_code, result: add_result});
        }
      }
     
    };
    /**
    for (var row = 0; row < results.length; row++){
      var add_contact_data = results[row].contact;
      var add_result = results[row].result;
      var add_test_code = results[row].code;
      this.ELEMENT_DATA.push({position: add_position, contact: add_contact_data, code: add_test_code, result: add_result});
    }
     */
  }

}
