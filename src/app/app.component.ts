import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  menuItem: string = 'Recipes';

  onChangeMenuItem(menuItem: string){
    this.menuItem = menuItem;
  }
}
