import Customer from "../entity/Customer";
import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem";
import { v4 as uuid } from "uuid";

export default class OrderService {
  static getTotal(orders: Order[]): number {
    return orders.reduce((total, order) => {
      return total + order.total();
    }, 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
} 