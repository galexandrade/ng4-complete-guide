import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorage } from "app/shared/data-storage.service";
import { RecipeService } from "app/services/recipe.service";
import { AuthService } from "app/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private dataStorage: DataStorage, 
              private recipeService: RecipeService,
              public authService: AuthService) { 
    
  }

  ngOnInit() {
  }

  onSave(){
    this.dataStorage.storeRecipes().subscribe((response) => {
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
    this.authService.logout();
  }

}
