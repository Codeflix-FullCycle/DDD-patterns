import OrderItem from "./OrderItem";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const item = new OrderItem("", "test", 1, "p1", 2);
    }).toThrowError("Id is required");
  });

  it("should throw error when name id is empty", () => {
    expect(() => {
      const item = new OrderItem("1", "", 1, "p1", 2);
    }).toThrowError("Name is required");
  });

  it("should throw error when item price is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("1", "test", 0, "p1", 2);
    }).toThrowError("Price must be greater than 0");
  });

  it("should throw error when product id is empty", () => {
    expect(() => {
      const item = new OrderItem("1", "test", 2, "", 2);
    }).toThrowError("Product id is required");
  });

  it("should throw error when item quantity is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("1", "test", 1, "p1", 0);
    }).toThrowError("Quantity must be greater than 0");
  });
});