import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/Product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe("", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      ProductModel,
    ]);

    await sequelize.sync();
  })

  afterEach(() => {
    sequelize.close();
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(
      "1",
      "Product 1",
      100
    )
    await productRepository.create(product);
    const productFromDb = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productFromDb).toBeDefined();
    expect(productFromDb!.id).toBe("1");
    expect(productFromDb!.name).toBe("Product 1");
    expect(productFromDb!.price).toBe(100);
  })

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(
      "1",
      "Product 1",
      100
    )
    await productRepository.create(product);

    product.changeName("Product 1 Updated");
    product.changePrice(200);
    await productRepository.update(product);

    const productFromDbUpdated = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productFromDbUpdated).toBeDefined();
    expect(productFromDbUpdated!.id).toBe("1");
    expect(productFromDbUpdated!.name).toBe("Product 1 Updated");
    expect(productFromDbUpdated!.price).toBe(200);
  });

  it("should delete a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(
      "1",
      "Product 1",
      100
    )
    await productRepository.create(product);

    await productRepository.delete(
      product.id
    );

    const productFromDb = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productFromDb).toBeNull();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(
      "1",
      "Product 1",
      100
    )
    await productRepository.create(product);

    const productFromDb = await productRepository.find("1");

    expect(productFromDb).toBeDefined();
    expect(productFromDb!.id).toBe("1");
    expect(productFromDb!.name).toBe("Product 1");
    expect(productFromDb!.price).toBe(100);
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(
      "1",
      "Product 1",
      100
    )
    await productRepository.create(product);

    const productFromDb = await productRepository.findAll();

    expect(productFromDb).toBeDefined();
    expect(productFromDb.length).toBe(1);
    expect(productFromDb[0].id).toBe("1");
    expect(productFromDb[0].name).toBe("Product 1");
    expect(productFromDb[0].price).toBe(100);
  });
})

