import * as fromSoppingList from "app/shopping-list/store/shopping-list.reducers";
import * as fromAuth from "app/auth/store/auth.reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    shoppingList: fromSoppingList.State,
    auth: fromAuth.State
}

/*
export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromSoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
};
*/