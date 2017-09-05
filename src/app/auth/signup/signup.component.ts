import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "app/auth/auth.service";
import * as fromApp from 'app/store/app.reducers'
import * as fromAuth from 'app/auth/store/auth.actions'
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);
    this.store.dispatch(new fromAuth.TrySignup({username: email, password: password}))
    //this.authService.signupUser(email, password);
  }

}
