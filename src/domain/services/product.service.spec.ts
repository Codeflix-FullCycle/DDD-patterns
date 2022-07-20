import Product from "../entity/Product";
import ProductService from "./product.service";

describe("ProductService unit test", () => {
  it("should be change the price of all products", () => {
    const products = [
      new Product("Product1", "Product 1", 100),
      new Product("Product2", "Product 2", 200),
      new Product("Product3", "Product 3", 300),
    ];
    const increasePercentage = 100;
    const result = ProductService.changePrice(products, increasePercentage);
    expect(result[0].price).toEqual(200);
    expect(result[1].price).toEqual(400);
    expect(result[2].price).toEqual(600);
  })
});