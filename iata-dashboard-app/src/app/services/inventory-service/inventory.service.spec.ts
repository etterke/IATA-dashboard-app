import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { InventoryService } from './inventory.service';
import {
  InventoryItemPayload,
  InventoryItemResponse
} from '../../models/inventory.model';

describe('InventoryService', () => {
  let inventoryService: InventoryService;
  let httpTestingController: HttpTestingController;
  const testUrl: string = 'http://localhost:3000/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryService]
    });
    inventoryService = TestBed.inject(InventoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return products', () => {
    const products: InventoryItemResponse[] = [];
    inventoryService.getProducts().subscribe((result) => {
      expect(products).toEqual(result);
    });
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(products);
  });

  it('should register products', () => {
    const products: InventoryItemResponse[] = [];
    const product: InventoryItemPayload = {
      product: 'plane',
      stock: 'low',
      supplier: 'Malev'
    };
    const expectedResult: InventoryItemResponse[] = [
      {
        id: 1,
        product: 'plane',
        stock: 'low',
        supplier: 'Malev'
      }
    ];
    inventoryService.addProduct(product).subscribe(() => {
      expect(products).toEqual(expectedResult);
    });
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(products);
  });
});
