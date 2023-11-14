import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddEditInventoryComponent } from '../add-edit-inventory/add-edit-inventory.component';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItemPayload } from '../../models/inventory.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'product', 'stock', 'supplier', 'action'];
  dataSource!: InventoryItemPayload[];

  constructor(
    private dialog: MatDialog,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  openAddEditDialog(): void {
    this.dialog.open(AddEditInventoryComponent);
  }

  getProducts(): void {
    this.inventoryService.getProducts().subscribe((result) => {
      this.dataSource = result;
      console.log(result);
    });
  }

  deleteProduct(id: number): void {
    this.inventoryService.deleteProduct(id).subscribe((result) => {
      alert('Product deleted');
      this.getProducts();
    });
  }

  editProduct(data: any): void {
    this.dialog.open(AddEditInventoryComponent, { data });
  }
}
