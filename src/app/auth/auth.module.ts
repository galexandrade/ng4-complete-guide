import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "app/auth/auth-routing.module";
import { SignupComponent } from "app/auth/signup/signup.component";
import { SigninComponent } from "app/auth/signin/signin.component";
import { HttpModule } from "@angular/http";


@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule{}