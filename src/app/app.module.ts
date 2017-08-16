import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from "app/app-routing.module";
import { ShoppingModule } from "app/shopping-list/shopping.module";
import { AuthModule } from "app/auth/auth.module";
import { CoreModule } from "app/core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ShoppingModule,
    AuthModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
