import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/resources', title: 'Resources',  icon: 'pe-7s-graph', class: '' },
    { path: '/clients', title: 'Clients',  icon:'pe-7s-user', class: '' },
    { path: '/inventory', title: 'Inventory',  icon:'pe-7s-note2', class: '' }
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
