"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Bitcoin extends sequelize_1.Model {
}
Bitcoin.init({
    price: {
        validate: {
            isFloat: true
        },
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 100
    }
}, {
    tableName: "bitcoin",
    sequelize: index_1.default,
});
exports.default = Bitcoin;
//# sourceMappingURL=bitcoin.js.map