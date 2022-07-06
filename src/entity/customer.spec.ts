import Address from "./Address"
import Customer from "./Customer"

describe("Customer unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "test", "test@test.com")
    }).toThrowError("Id is required")
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("1", "", "test@test.com")
    }).toThrowError("Name is required")
  })

  it("should throw error when email is empty", () => {
    expect(() => {
      new Customer("1", "test", "")
    }).toThrowError("Email is required")
  })

  it("should change name", () => {
    const customer = new Customer("1", "test", "test@test");
    customer.changeName("test2");
    expect(customer.name).toBe("test2");
    expect(() => customer.changeName("")).toThrowError("Name is required");
  })

  it("should active customer", () => {
    const customer = new Customer("1", "test", "test@test");
    customer.address = new Address("test", "test", "test", "test");
    customer.activate();
    expect(customer.isActive()).toBe(true);
  })

  it("should active customer", () => {
    const customer = new Customer("1", "test", "test@test");
    customer.address = new Address("test", "test", "test", "test");
    customer.activate();
    expect(customer.isActive()).toBe(true);
  })

  it("should throw error when address is undefined", () => {
    const customer = new Customer("1", "test", "test@test");
    expect(() => customer.activate()).toThrowError("Address is mandatory to activate customer");
  })

  it("should deactivate customer", () => {
    const customer = new Customer("1", "test", "test@test");
    expect(customer.isActive()).toBe(false);
    customer.address = new Address("test", "test", "test", "test");
    customer.activate();
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  })

  it("should add reward points", () => {
    const customer = new Customer("1", "test", "test@test");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);
    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(200);
  });
})