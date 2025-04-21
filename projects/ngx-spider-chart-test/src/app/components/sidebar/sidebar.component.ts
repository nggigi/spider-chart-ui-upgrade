import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { ISidebarGroup } from './interfaces/sidebar-group.interface';
import { componentItems } from './lookups/component-items.lookup';
import { directiveItems } from './lookups/directive-items.lookup';
import { layoutItems } from './lookups/layout-items.lookup';
import { modelItems } from './lookups/model-items.lookup';
import { styleItems } from './lookups/style-items.lookup';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public sidebarItems: ISidebarGroup[];

  public activeUrl: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.sidebarItems = [
      {
        title: 'Components',
        items: componentItems.sort((a, b) => a.text.localeCompare(b.text)),
      },
      {
        title: 'Directives',
        items: directiveItems.sort((a, b) => a.text.localeCompare(b.text)),
      },
      {
        title: 'Models',
        items: modelItems.sort((a, b) => a.text.localeCompare(b.text)),
      },
      {
        title: 'Styling',
        items: styleItems.sort((a, b) => a.text.localeCompare(b.text)),
      },
      {
        title: 'Layout',
        items: layoutItems.sort((a, b) => a.text.localeCompare(b.text)),
      },
    ];

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => {
        this.activeUrl = this.router.url.slice(1);
      });
  }

  onNavigate(route: string) {
    this.activeUrl = route;
    this.router.navigate([`/${route}`]);
  }
}
