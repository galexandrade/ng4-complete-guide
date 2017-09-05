import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'environments/environment'

import { AppComponent } from './app.component';
import { AppRoutingModule } from "app/app-routing.module";
import { ShoppingModule } from "app/shopping-list/shopping.module";
import { AuthModule } from "app/auth/auth.module";
import { CoreModule } from "app/core/core.module";
import { StoreModule } from "@ngrx/store";
import { shoppingListReducer } from "app/shopping-list/store/shopping-list.reducers";
import { authReducer } from "app/auth/store/auth.reducers";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "app/auth/store/auth.effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ShoppingModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer, auth: authReducer}),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    //Use Redux tools for chrome
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
