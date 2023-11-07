import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isOpenDropdown = false;
  isDarkMode = false;

  constructor(private serviceDS: DataStorageService) {}

  changeMode() {
    let htmlTag = document.documentElement;
    htmlTag.classList.toggle('dark');
    this.isDarkMode = !this.isDarkMode;
  }

  clickedOutside() {
    this.isOpenDropdown = false;
  }

  onSaveData() {
    this.serviceDS.storeRecipes();
    alert('Data saved');
    this.clickedOutside();
  }

  onFetchData() {
    this.serviceDS.fetchRecipes().subscribe();
    alert('Data fetched');
    this.clickedOutside();
  }
}
