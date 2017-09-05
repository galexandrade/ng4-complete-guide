import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "app/services/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from 'app/store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f')
  form: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  //editedItemId: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe((data) => {
      if(data.editedIngredientIndex > -1){
        this.editedItem = data.editedIngredient;
        this.editMode = true;

        this.form.reset();
        this.form.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      }
      else{
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    let ingredient = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode)
      //this.shoppingListService.updateIngredient(this.editedItemId, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: ingredient}));
    else
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));

    this.onClear();
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    //this.shoppingListService.deleteIngredient(this.editedItemId);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
