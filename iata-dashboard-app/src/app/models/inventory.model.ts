export interface InventoryItemResponse {
  id: number;
  product: string;
  stock: string;
  supplier: string;
}

export interface InventoryItemPayload
  extends Omit<InventoryItemResponse, 'id'> {}
