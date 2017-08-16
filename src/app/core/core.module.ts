import { NgModule } from "@angular/core";
import { HeaderComponent } from "app/core/header/header.component";
import { HomeComponent } from "app/core/home/home.component";
import { SharedModule } from "app/shared/shared.module";
import { AppRoutingModule } from "app/app-routing.module";

import { RecipeService } from "app/services/recipe.service";
import { ShoppingListService } from "app/services/shopping-list.service";
import { DataStorage } from "app/shared/data-storage.service";
import { AuthService } from "app/auth/auth.service";
import { AuthGuard } from "app/auth/auth-guard.service";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [
        RecipeService, 
        ShoppingListService, 
        DataStorage, 
        AuthService
    ]
})
export class CoreModule{}