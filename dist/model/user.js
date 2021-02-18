"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class User extends sequelize_1.Model {
}
User.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
            isunique(value) {
                return __awaiter(this, void 0, void 0, function* () {
                    let olduser = yield User.findOne({
                        where: {
                            username: value
                        }
                    });
                    if (olduser) {
                        throw new Error('Username already in use!');
                    }
                });
            },
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            isunique(value) {
                return __awaiter(this, void 0, void 0, function* () {
                    let olduser = yield User.findOne({
                        where: {
                            email: value,
                        }
                    });
                    if (olduser) {
                        throw new Error('Email address already in use!');
                    }
                });
            },
        },
    },
    bitcoinAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    usdBalance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
}, {
    tableName: "users",
    sequelize: index_1.default,
});
exports.default = User;
//# sourceMappingURL=user.js.map