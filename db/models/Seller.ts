import {Column, HasMany, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Product} from './Product';
import {Order} from './Order';

export type SellerCreateArgs = {
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
};

// eslint-disable-next-line new-cap
@Table({tableName: 'Seller', createdAt: true, deletedAt: true, updatedAt: true})
export class Seller extends Model<Seller, SellerCreateArgs> {
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
    name!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    lastName!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    })
    username!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    password!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    })
    phone!: string;

    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.STRING,
        defaultValue: 0,
    })
    cash!: string;

    // eslint-disable-next-line new-cap
    @HasMany(() => Order, 'sellerId')
    orders!: Order[];

    // eslint-disable-next-line new-cap
    @HasMany(() => Product, 'ownerId')
    sellItems!: Product[];
}
