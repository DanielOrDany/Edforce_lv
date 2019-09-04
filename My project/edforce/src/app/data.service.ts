import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }
  
  createNewTest(test) {
    console.log(test);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/test', true);
    xhr.withCredentials = false;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(test));
  }

  public getResults(email): any {
    console.log(email);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/test/results', true);
    xhr.withCredentials = false;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(email));
    return xhr;
  }

  createNewOwner(owner){
    console.log(owner);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/owners/register', true);
    xhr.withCredentials = false;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(owner));
  }

  public findOwner(owner): any{
    console.log(owner);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/owners/find-owner', true);
    xhr.withCredentials = false;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(owner))
    return xhr;
  }

  
  public findOwnerByEmail(owner): any{
    console.log(owner);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/owners/find-owner-by-email', true);
    xhr.withCredentials = false;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(owner))
    return xhr;
  }
}
