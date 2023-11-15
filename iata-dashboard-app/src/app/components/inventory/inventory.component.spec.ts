import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryComponent } from './inventory.component';
import { InventoryService } from '../../services/inventory-service/inventory.service';
import { MatDialog } from '@angular/material/dialog';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryComponent],
      providers: [
        {
          provide: InventoryService,
          useValue: jasmine.createSpyObj('InventoryService', [
            'addProduct',
            'editProduct'
          ])
        },
        { provide: MatDialog, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
