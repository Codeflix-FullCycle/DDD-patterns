import Customer from "../entity/Customer";
import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem";
import OrderService from "./order.service";

describe("OrderService unit test", () => {
  it("should get total all orders", () => {

    const item1 = new OrderItem("i1", "Item 1", 10, "1", 1);
    const item2 = new OrderItem("i2", "Item 2", 20, "2", 2);

    const order1 = new Order("o1", "c1", [
      item1
    ])

    const order2 = new Order("o2", "c1", [
      item2
    ])

    const orders = [
      order1, order2
    ];
    const result = OrderService.getTotal(orders);
    expect(result).toEqual(50);
  })

  it("should place an order", () => {
    const item1 = new OrderItem("i1", "Item 1", 10, "1", 1);

    const customer = new Customer("c1", "John", "john@test.com");

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toEqual(5);
    expect(order.total()).toEqual(10);
  });

})