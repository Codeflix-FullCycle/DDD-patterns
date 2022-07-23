import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/Address";
import Customer from "../../domain/entity/Customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository", () => {
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
    ]);

    await sequelize.sync();
  });

  afterEach(() => {
    sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
      "1",
      "Customer 1",
    )
    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zip 1",
      1
    )

    customer.changeAddress(address);

    await customerRepository.create(customer);
    const customerFromDb = await CustomerModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(customerFromDb).toBeDefined();
    expect(customerFromDb!.id).toBe("1");
    expect(customerFromDb!.name).toBe("Customer 1");
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
      "1",
      "Customer 1",
    )

    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zip 1",
      1
    )

    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName("Customer 1 Updated");

    await customerRepository.update(customer);

    const customerFromDbUpdated = await CustomerModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(customerFromDbUpdated).toBeDefined();
    expect(customerFromDbUpdated!.id).toBe("1");
    expect(customerFromDbUpdated!.name).toBe("Customer 1 Updated");
  });

  it("should delete a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
      "1",
      "Customer 1",
    )

    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zip 1",
      1
    )

    customer.changeAddress(address);

    await customerRepository.create(customer);

    await customerRepository.delete(customer.id);

    const customerFromDb = await CustomerModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(customerFromDb).toBeNull();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
      "1",
      "Customer 1",
    )

    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zip 1",
      1
    )

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerFromDb = await customerRepository.find("1");

    expect(customerFromDb.id).toBe("1");
    expect(customerFromDb.name).toBe("Customer 1");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
      "1",
      "Customer 1",
    )

    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zip 1",
      1,
    )

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customer2 = new Customer(
      "2",
      "Customer 2",
    )

    const address2 = new Address(
      "Street 2",
      "City 2",
      "State 2",
      "Zip 2",
      2,
    )

    customer2.changeAddress(address2);

    await customerRepository.create(customer2);

    const customersFromDb = await customerRepository.findAll();

    expect(customersFromDb.length).toBe(2);
    expect(customersFromDb[0].id).toBe("1");
    expect(customersFromDb[0].name).toBe("Customer 1");

    expect(customersFromDb[1].id).toBe("2");
    expect(customersFromDb[1].name).toBe("Customer 2");

  });
});
