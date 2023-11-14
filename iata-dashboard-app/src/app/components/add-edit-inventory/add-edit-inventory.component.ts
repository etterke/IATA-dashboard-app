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
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';

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

  inventoryForm: any;

  constructor(
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.inventoryForm = this.formBuilder.group({
      product: new FormControl(''),
      stock: new FormControl(''),
      supplier: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.inventoryForm.patchValue(this.data);
  }

  onFormSubmit() {
    this.inventoryService
      .addProduct(this.inventoryForm.value)
      .subscribe((response) => {
        console.log(response);
        alert('Product added successfully');
        this.dialogRef.close(true);
      });
  }
}
