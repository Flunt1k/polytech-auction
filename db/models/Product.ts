import {Column, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

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
@Table({tableName: 'Customer', createdAt: true, deletedAt: true, updatedAt: true})
export class Product extends Model<Product, ProductCreateArgs> {
    // eslint-disable-next-line new-cap
    @Column({
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
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
}
