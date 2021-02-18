
import { Model, DataTypes } from "sequelize";

import sequelize from './index'

class User extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
  public bitcoinAmount!: number
  public usdBalance!: number
  public createdAt!: Date
  public updatedAt!: Date
}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
      async isunique(value: string) {
        let olduser = await User.findOne({
          where: {
            username: value
          }
        })
        if (olduser) {
          throw new Error('Username already in use!');
        }
      },
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      async isunique(value: string) {
        let olduser = await User.findOne({
          where: {
            email: value,
          }
        })
        if (olduser) {
          throw new Error('Email address already in use!');
        }
      },
    },
  },
  bitcoinAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  usdBalance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
},
  {
    tableName: "users",
    sequelize,
  }
);

export default User