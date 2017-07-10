import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()
  onMenuSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  selectMenu(menuItem: string){
    this.onMenuSelect.emit(menuItem);
  }

}
