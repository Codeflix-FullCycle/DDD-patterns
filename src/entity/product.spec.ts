import Product from "./Product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "test", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name  is empty", () => {
    expect(() => {
      new Product("1", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is 0", () => {
    expect(() => {
      new Product("1", "test", 0);
    }).toThrowError("Price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("1", "test", 100);
    product.changeName("test2");
    expect(product.name).toBe("test2");
    expect(() => product.changeName("")).toThrowError("Name is required");
  });

  it("should change price", () => {
    const product = new Product("1", "test", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
    expect(() => product.changePrice(0)).toThrowError("Price must be greater than 0");
  })
})