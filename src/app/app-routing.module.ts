import { Recipe } from "app/recipes/recipe.model";
import { NgModule } from "@angular/core";
import { RouterModule, PreloadAllModules } from "@angular/router";

import { ShoppingListComponent } from "app/shopping-list/shopping-list.component";
import { AuthGuard } from "app/auth/auth-guard.service";
import { HomeComponent } from "app/core/home/home.component";

const appRoutes = [
    {path: "", component: HomeComponent, pathMatch: 'full'},
    {path: "recipes", loadChildren: './recipes/recipes.module#RecipesModule'},
    {path: "shopping-list", component: ShoppingListComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes, 
            {
                useHash: true,
                preloadingStrategy: PreloadAllModules
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{
}