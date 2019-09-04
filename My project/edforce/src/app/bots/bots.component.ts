import { Questions } from './../interfaces/questions';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss']
})

export class BotsComponent implements OnInit {
  isForQuestion: number;
  questions: Questions[];
  questionAsk: string;
  questionAnswers: string;
  questionAnswer: string;
  testCode: string;
  status: string;

  findParams = [{
    email: "",
    password: ""
  }]

  constructor(private data: DataService, private router: Router) {
 
  }

  ngOnInit() {
  
    this.isForQuestion = 4;
    this.questionAsk = '';
    this.questionAnswers = '';
    this.questionAnswer = '';
    this.status = 'active';
    this.questions = [
      {
        'id': 1,
        'ask': '[question] Edforce is best variant for offline schools?',
        'answers': '[comma-separated list of answers] Yes, No, Maybe',
        'answer': '[right answer] Yes',
        'testCode': '',
        'status': 'active',
        'owner_email': localStorage.getItem('email')
      },
    ]

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
  }

  addQuestion(): void{
    if  (this.questionAsk.trim().length == 0){
      return;
    }

    this.questions.push({
        id: this.isForQuestion,
        ask: this.questionAsk,
        answers:  this.questionAnswers,
        answer:  this.questionAnswer,
        testCode: '',
        status: this.status,
        owner_email: localStorage.getItem('email')
    })

    this.questionAsk = '';
    this.questionAnswers = '';
    this.questionAnswer = '';
    this.status = 'active';
    this.isForQuestion++;
  }

  deleteQuestion(id: number): void {
    this.questions = this.questions.filter((question: Questions) => question.id != id);
  }

  saveAllQuestions(){
    for (var x = 0; x < this.questions.length; x++) {
      this.questions[x].testCode =  this.testCode;
    }
    this.data.createNewTest(this.questions);
  }

}
