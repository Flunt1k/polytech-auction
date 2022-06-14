import {Column, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Order} from './Order';

export type CustomerCreateArgs = {
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
};

// eslint-disable-next-line new-cap
@Table({
    tableName: 'Customer',
    createdAt: true,
    deletedAt: true,
    updatedAt: true,
    freezeTableName: true,
})
export class Customer extends Model<Customer, CustomerCreateArgs> {
    // eslint-disable-next-line new-cap
    @ForeignKey(() => Order)
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
    @HasMany(() => Order, 'id')
    orders!: Order[];
}
