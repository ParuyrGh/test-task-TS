
import { Sequelize, Model, DataTypes } from "sequelize";

import sequelize from './index'

class Bitcoin extends Model {
    public id!: number;
    public price!: number
    public createdAt!: Date
    public updatedAt!: Date
}

Bitcoin.init({
    price: {
        validate: {
            isFloat: true
        },
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 100
    }
}, {
    tableName: "bitcoin",
    sequelize,
});



export default Bitcoin