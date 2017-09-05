import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorage } from "app/shared/data-storage.service";
import { RecipeService } from "app/services/recipe.service";
import { AuthService } from "app/auth/auth.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Store } from "@ngrx/store";
import * as fromApp from 'app/store/app.reducers';
import * as fromAuth from 'app/auth/store/auth.reducers';
import * as authActions from 'app/auth/store/auth.actions';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorage: DataStorage,
              private recipeService: RecipeService,
              public authService: AuthService,
              private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave(){
    this.dataStorage.storeRecipes().subscribe((response: HttpEvent<Object>) => {
      //console.log(response.type === HttpEventType.Response);
      console.log(response);
    });
  }

  onFetch(){
    this.dataStorage.fetchRecipes().subscribe((recipes) => {
      this.recipeService.setRecipes(recipes);
      console.log(recipes);
    });
  }

  onLogout(){
    //this.authService.logout();
    this.store.dispatch(new authActions.Logout());
  }

}
