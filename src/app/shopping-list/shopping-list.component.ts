import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "app/services/shopping-list.service";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Rx";

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from 'app/store/app.reducers';



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListStates: Observable<{ingredients: Ingredient[]}>;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListStates = this.store.select('shoppingList');
  }

  onEditItem(id: number){
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
    //this.shoppingListService.startedEditing.next(id);
  }

}
