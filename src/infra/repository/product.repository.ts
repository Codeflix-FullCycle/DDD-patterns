import Product from "../../domain/entity/Product";
import ProductRepositoryInterface from "../../domain/repository/productRespoitory.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  public async findAll(): Promise<Product[]> {
    const allProducts = await ProductModel.findAll();

    return allProducts.map((product) => {
      return new Product(
        product.id,
        product.name,
        product.price
      );
    }
    );
  }

  public async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: {
        id,
      },
    });

    return new Product(
      product.id,
      product.name,
      product.price
    );
  }

  public async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  public async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  public async delete(id: string): Promise<void> {
    await ProductModel.destroy({
      where: {
        id: id,
      },
    });

  }

}