import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    //Used to configure firebase SDK
    firebase.initializeApp({
      apiKey: "AIzaSyD855A3LzQILuVZHZnidCoK9OadDIXyc1Y",
      authDomain: "ng-recipe-book-d42fc.firebaseapp.com"
    });
  }
}
