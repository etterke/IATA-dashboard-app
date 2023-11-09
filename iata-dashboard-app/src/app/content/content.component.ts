import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, MatSidenavModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  @HostBinding('class.app-content') hostClass = true;

}
