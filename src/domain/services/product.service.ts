import Product from "../entity/Product";

export default class ProductService {
  static changePrice(products: Product[], increasePercentage: number): Product[] {
    return products.map((product) => {
      product.changePrice(product.price * (1 + increasePercentage / 100))
      return product;
    });
  }
}