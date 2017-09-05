import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/auth/auth.service";
import { NgForm } from "@angular/forms";
import * as fromApp from 'app/store/app.reducers'
import * as fromAuth from 'app/auth/store/auth.actions'
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);
    this.store.dispatch(new fromAuth.TrySignin({username: email, password: password}))
    //this.authService.signinUser(email, password);
  }

}
