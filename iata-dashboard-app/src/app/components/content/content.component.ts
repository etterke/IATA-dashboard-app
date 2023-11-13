import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

interface MenuItem {
  link: string;
  title: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    link: '/dashboard/inventory',
    title: 'Inventory'
  },
  {
    link: '/dashboard/user-behaviour',
    title: 'User Behaviour'
  },
  {
    link: '/dashboard/analytics',
    title: 'Sales Analytics'
  }
];

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  @HostBinding('class.app-content') hostClass = true;

  menuItems = MENU_ITEMS;

  trackByTitle(index: number, item: MenuItem): string {
    return item.title;
  }
}
