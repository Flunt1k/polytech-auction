import {BelongsTo, Column, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Seller} from './Seller';
import {Order} from './Order';

export type ProductCreateArgs = {
    productName: string;
    image: Buffer;
    description: string;
    year: string;
    buyInPrice?: number;
    initialPrice?: number;
    deadline?: string;
    ownerId?: string;
};

// eslint-disable-next-line new-cap
@Table({tableName: 'Product', createdAt: true, deletedAt: true, updatedAt: true})
export class Product extends Model<Product, ProductCreateArgs> {
    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    })
    id!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    productName!: string;

    // eslint-disable-next-line new-cap
    @Column({
        // eslint-disable-next-line new-cap
        type: DataTypes.BLOB('long'),
        allowNull: false,
    })
    image!: Buffer;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    description!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    year!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.DOUBLE,
    })
    buyInPrice!: number;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.DOUBLE,
    })
    initialPrice!: number;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.DATE,
    })
    deadline!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    expired!: boolean;

    // eslint-disable-next-line new-cap
    @ForeignKey(() => Seller)
    // eslint-disable-next-line new-cap
    @Column({type: DataTypes.UUID})
    ownerId!: string;

    // eslint-disable-next-line new-cap
    @BelongsTo(() => Seller, 'ownerId')
    owner!: Seller;

    // eslint-disable-next-line new-cap
    @HasMany(() => Order, 'productId')
    order!: Order[];
}
