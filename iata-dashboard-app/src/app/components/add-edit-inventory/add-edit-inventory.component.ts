import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InventoryService } from '../../services/inventory-service/inventory.service';

@Component({
  selector: 'app-add-edit-inventory',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-edit-inventory.component.html',
  styleUrl: './add-edit-inventory.component.scss'
})
export class AddEditInventoryComponent implements OnInit {
  @HostBinding('class.app-add-edit-inventory') hostClass = true;

  inventoryForm: FormGroup;

  constructor(
    private inventoryService: InventoryService,
    private dialogRef: MatDialogRef<AddEditInventoryComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.inventoryForm = new FormGroup({
      product: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      supplier: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.inventoryForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.data) {
      this.inventoryService
        .editProduct(this.data.id, this.inventoryForm.value)
        .subscribe(() => {
          alert('Product updated successfully');
          this.dialogRef.close(true);
        });
    } else {
      this.inventoryService
        .addProduct(this.inventoryForm.value)
        .subscribe(() => {
          alert('Product added successfully');
          this.dialogRef.close(true);
        });
    }
  }
}
