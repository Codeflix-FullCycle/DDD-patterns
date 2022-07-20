import Address from "../../domain/entity/Address";
import Customer from "../../domain/entity/Customer";
import CustomerRepositoryInterface from "../../domain/repository/customerRepository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";
export default class CustomerRepository implements CustomerRepositoryInterface {
  public async findAll(): Promise<Customer[]> {
    const allCustomers = await CustomerModel.findAll();

    return allCustomers.map((customer) => {
      const customerEntity = new Customer(
        customer.id,
        customer.name,
        customer.email
      );

      const address = new Address(
        customer.street,
        customer.city,
        customer.state,
        customer.zip,
        customer.number
      );
      customerEntity.addRewardPoints(customer.rewardPoints);
      customerEntity.address = address;

      return customerEntity
    }
    );
  }

  public async find(id: string): Promise<Customer> {
    const customer = await CustomerModel.findOne({
      where: {
        id,
      },
    });
    const customerEntity = new Customer(
      customer.id,
      customer.name,
      customer.email
    );

    customerEntity.addRewardPoints(customer.rewardPoints);

    const address = new Address(
      customer.street,
      customer.city,
      customer.state,
      customer.zip,
      customer.number
    );

    customerEntity.address = address;
    return customerEntity
  }

  public async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      street: entity.address.street,
      city: entity.address.city,
      state: entity.address.state,
      zip: entity.address.zip,
      number: entity.address.number,
      rewardPoints: entity.rewardPoints,
      active: entity.active,
    });
  }

  public async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        email: entity.email,
        street: entity.address.street,
        city: entity.address.city,
        state: entity.address.state,
        rewardPoints: entity.rewardPoints,
        active: entity.active,
        zip: entity.address.zip,
        number: entity.address.number,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  public async delete(id: string): Promise<void> {
    await CustomerModel.destroy({
      where: {
        id: id,
      },
    });
  }
}