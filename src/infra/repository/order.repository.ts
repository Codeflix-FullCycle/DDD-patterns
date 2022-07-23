
import Order from "../../domain/entity/Order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-items.model";
export default class OrderRepository {

  public async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        id: item.id,
      }))
    },
      {
        include: [
          {
            model: OrderItemModel,
          }
        ]
      }
    );
  }

}