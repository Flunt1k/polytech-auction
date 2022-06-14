import {Column, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export type UserCreateArgs = {
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
};

// eslint-disable-next-line new-cap
@Table({tableName: 'User', createdAt: true, deletedAt: true, updatedAt: true})
export class User extends Model<User, UserCreateArgs> {
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
}
