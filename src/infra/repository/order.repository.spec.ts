import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/entity/Order";
import OrderItem from "../../domain/entity/OrderItem";
import Product from "../../domain/entity/Product";
import Address from "../../domain/entity/Address";
import Customer from "../../domain/entity/Customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-items.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      CustomerModel,
      OrderModel,
      ProductModel,
      OrderItemModel,
    ]);

    await sequelize.sync();
  });

  afterEach(() => {
    sequelize.close();
  });

  it("should create an order", async () => {
    const customer = new Customer(
      "123",
      "Customer 1"
    )
    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zip 1",
      1
    )
    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(
      "1",
      "Product 1",
      1,
    )
    await productRepository.create(product);

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 1);
    const order = new Order('1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFromDb = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderFromDb).toBeDefined();
    expect(orderFromDb!.id).toBe(order.id);
    expect(orderFromDb!.customer_id).toBe(customer.id);
    expect(orderFromDb!.items[0].product_id).toBe(product.id);
    expect(orderFromDb!.items[0].name).toBe(product.name);
    expect(orderFromDb!.items[0].quantity).toBe(1);
    expect(orderFromDb!.items[0].price).toBe(1);
    expect(orderFromDb!.total).toBe(1);
  })
})
