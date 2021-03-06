import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Product} from './Product';
import {Customer} from './Customer';
import {Seller} from './Seller';

export type OrderCreateArgs = {
    sellerId: string;
    customerId: string;
    productId: string;
    phone: string;
    email: string;
    deliveryAddress: string;
    isBuyIn: boolean;
    bet: number;
};

// eslint-disable-next-line new-cap
@Table({tableName: 'Order', createdAt: true, deletedAt: true, updatedAt: true})
export class Order extends Model<Order, OrderCreateArgs> {
    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    })
    id!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    })
    orderNumber!: number;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    phone!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    email!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    deliveryAddress!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.BOOLEAN,
        allowNull: false,
    })
    isBuyIn!: boolean;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.DOUBLE,
        allowNull: false,
    })
    bet!: number;

    // eslint-disable-next-line new-cap
    @ForeignKey(() => Customer)
    // eslint-disable-next-line new-cap
    @Column({type: DataTypes.UUID})
    customerId!: string;

    // eslint-disable-next-line new-cap
    @BelongsTo(() => Customer, 'customerId')
    customer!: Customer;

    // eslint-disable-next-line new-cap
    @ForeignKey(() => Seller)
    // eslint-disable-next-line new-cap
    @Column({type: DataTypes.UUID})
    sellerId!: string;

    // eslint-disable-next-line new-cap
    @BelongsTo(() => Seller, 'sellerId')
    seller!: Seller;

    // eslint-disable-next-line new-cap
    @ForeignKey(() => Product)
    // eslint-disable-next-line new-cap
    @Column({type: DataTypes.UUID})
    productId!: string;

    // eslint-disable-next-line new-cap
    @BelongsTo(() => Product, 'productId')
    product!: Seller;
}
