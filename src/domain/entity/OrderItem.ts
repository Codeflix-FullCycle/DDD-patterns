export default class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _productId: string;
  private _quantity: number;

  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;

    this.validate();
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price * this._quantity;
  }

  validate() {
    if (!this._id) {
      throw new Error('Id is required');
    }
    if (!this._name) {
      throw new Error('Name is required');
    }
    if (this._price === 0) {
      throw new Error('Price must be greater than 0');
    }
    if (!this._productId) {
      throw new Error('Product id is required');
    }
    if (this._quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
  }
}