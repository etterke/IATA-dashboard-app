import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddEditInventoryComponent } from '../add-edit-inventory/add-edit-inventory.component';
import { InventoryService } from '../../services/inventory-service/inventory.service';
import {
  InventoryItemResponse,
  InventoryRow
} from '../../models/inventory.model';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';

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
  @HostBinding('class.app-inventory') hostClass = true;

  displayedColumns: string[] = ['id', 'product', 'stock', 'supplier', 'action'];
  products: InventoryItemResponse[] = [];
  dataSource: InventoryRow[] = [];
  unsubscribe$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // transformData(products: InventoryItemResponse[]): InventoryRow[] {
  //   this.dataSource = products.map(product => {
  //     let row: InventoryRow = {
  //       displayedColumn: product.id;
  //       title: product.

  //     }
  //   })
  // }

  openAddEditDialog(): void {
    const dialogRef = this.dialog.open(AddEditInventoryComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.getProducts();
        }
      });
  }

  getProducts(): void {
    this.inventoryService
      .getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result) => {
          this.products = result;
          // this.transformData(this.products);
        },
        (err) => console.log('HTTP Error', err)
      );
  }

  deleteProduct(id: number): void {
    this.inventoryService
      .deleteProduct(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          alert('Product deleted');
          this.getProducts();
        },
        (err) => console.log('HTTP Error', err)
      );
  }

  editProduct(data: any): void {
    this.dialog.open(AddEditInventoryComponent, { data });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
