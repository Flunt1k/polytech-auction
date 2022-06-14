import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Seller} from './Seller';
import {Order} from './Order';

export type ProductCreateArgs = {
    productName: string;
    imageLink: string;
    description: string;
    year: string;
    buyInPrice?: number;
    initialPrice?: number;
    deadline?: string;
};

// eslint-disable-next-line new-cap
@Table({tableName: 'Product', createdAt: true, deletedAt: true, updatedAt: true})
export class Product extends Model<Product, ProductCreateArgs> {
    // eslint-disable-next-line new-cap
    @ForeignKey(() => Order)
    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID,
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
        type: DataTypes.STRING,
        allowNull: false,
    })
    imageLink!: string;

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
    @ForeignKey(() => Seller)
    // eslint-disable-next-line new-cap
    @Column({type: DataTypes.UUID, unique: true})
    ownerId!: string;

    // eslint-disable-next-line new-cap
    @BelongsTo(() => Seller, 'ownerId')
    owner!: Seller;
}
