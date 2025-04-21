import { Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppStorageKeys } from './enums/app-storage.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('dynamicModal', { read: ViewContainerRef }) dynamicModal: ViewContainerRef;

  private router = inject(Router);

  public toggleModal: boolean = false;
  public currentRoute: string = '';

  public visibleSidebar: boolean = true;

  ngOnInit() {
    const cachedVisibleSidebar = localStorage.getItem(AppStorageKeys.VisibilitySide);
    this.visibleSidebar = !cachedVisibleSidebar || cachedVisibleSidebar === 'TRUE';
    this.router.events.pipe().subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }

  public setSidebarVisibility(visibility: boolean): void {
    this.visibleSidebar = visibility;
    localStorage.setItem(AppStorageKeys.VisibilitySide, this.visibleSidebar ? 'TRUE' : 'FALSE');
  }
}
