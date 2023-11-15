import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInventoryComponent } from './add-edit-inventory.component';
import { InventoryService } from '../../services/inventory-service/inventory.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddEditInventoryComponent', () => {
  const data = {
    title: 'title',
    message: 'message',
    summary: 'my summary'
  };

  let component: AddEditInventoryComponent;
  let fixture: ComponentFixture<AddEditInventoryComponent>;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditInventoryComponent],
      providers: [
        {
          provide: InventoryService,
          useValue: {
            addProduct: jasmine.createSpyObj('InventoryService', [
              'addProduct',
              'editProduct'
            ])
          }
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditInventoryComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
