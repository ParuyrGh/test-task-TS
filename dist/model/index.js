"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv");
const winston_1 = require("winston");
dotenv.config();
let PGHOST = process.env.PGHOST;
let PGUSER = process.env.PGUSER;
let PGDATABASE = process.env.PGDATABASE;
let PGPASSWORD = process.env.PGPASSWORD;
const logger = winston_1.createLogger({
    level: 'debug',
    transports: [
        new winston_1.transports.File({ filename: 'combined.log' })
    ]
});
const sequelize = new sequelize_1.Sequelize(`${PGDATABASE}`, `${PGUSER}`, `${PGPASSWORD}`, {
    host: PGHOST,
    dialect: 'postgres',
    logging: msg => logger.log('debug', msg)
});
sequelize.sync({ alter: true });
exports.default = sequelize;
//# sourceMappingURL=index.js.map