import Order from "./Order";
import OrderItem from "./OrderItem";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    const item = new OrderItem("1", "test", 1, "p1", 2);
    expect(() => {
      new Order("", "test", [item]);
    }).toThrowError("Id is required");
  });

  it("should throw error when customer id is empty", () => {
    const item = new OrderItem("1", "test", 1, "p1", 2);
    expect(() => {
      new Order("1", "", [item]);
    }).toThrowError("Customer id is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("1", "test", []);
    }).toThrowError("Item qtd must be greater than 0");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "test", 1, "p1", 2);
    const item2 = new OrderItem("2", "test2", 10, "p2", 2);
    const order = new Order("1", "test", [item, item2]);
    expect(order.total()).toBe(22);
  })

  it("should throw error if the item qtd is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("1", "test", 1, "p1", 0);
      const order = new Order("1", "test", [item]);
    }).toThrowError("Quantity must be greater than 0");
  })
})