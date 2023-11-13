import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

interface MenuItem {
  link: string;
  title: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    link: '/dashboard/content/inventory',
    title: 'Inventory'
  },
  {
    link: '/dashboard/content/user-behaviour',
    title: 'User Behaviour'
  },
  {
    link: '/dashboard/content/analytics',
    title: 'Sales Analytics'
  }
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @HostBinding('class.app-header') hostClass = true;

  menuItems = MENU_ITEMS;
}
