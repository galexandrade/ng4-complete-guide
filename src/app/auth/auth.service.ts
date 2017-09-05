import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

import * as fromApp from 'app/store/app.reducers';
import * as authActions from 'app/auth/store/auth.actions';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthService{
    token: string;

    constructor(private router: Router,
                private store: Store<fromApp.AppState>){

    }

    signupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.store.dispatch(new authActions.Signup());
            })
            .catch(error => console.log(error));
    }

    signinUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response);
                this.store.dispatch(new authActions.Signin());
                firebase.auth().currentUser.getIdToken().then((token: string) => this.store.dispatch(new authActions.SetToken(token)));
                this.router.navigate(['/']);
            })
            .catch(error => console.log(error));
    }

    getToken(){
        firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token);
        return this.token;
    }

    isAuthenticated(){
        return this.token != null;
    }

    logout(){
        firebase.auth().signOut();
        this.store.dispatch(new authActions.Logout());
    }
}