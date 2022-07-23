import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "./product.model";


@Table({
  tableName: "customer",
  timestamps: false
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @ForeignKey(() => OrderModel)
  @Column({
    allowNull: false
  })
  order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel

  @ForeignKey(() => ProductModel)
  @Column({
    allowNull: false
  })
  product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel

  @Column({
    allowNull: false
  })
  name: string;

  @Column({
    allowNull: false
  })
  quantity: number;

  @Column({
    allowNull: false
  })
  price: number;
}