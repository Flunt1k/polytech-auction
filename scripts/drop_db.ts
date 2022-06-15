import sequelize from '../db';

const dropDataBase = async () => {
    await sequelize.sync({force: true});
};

// eslint-disable-next-line no-console
dropDataBase().catch((err) => console.log(err));
