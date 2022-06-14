import {Column, Model, Table} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';

export type AdministratorCreateArgs = {
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
};

// eslint-disable-next-line new-cap
@Table({tableName: 'Administrator', createdAt: true, deletedAt: true, updatedAt: true})
export class Administrator extends Model<Administrator, AdministratorCreateArgs> {
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
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    })
    superuser!: string;
}
