import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { createLogger, transports } from 'winston'


dotenv.config();


let PGHOST = process.env.PGHOST
let PGUSER = process.env.PGUSER
let PGDATABASE = process.env.PGDATABASE
let PGPASSWORD = process.env.PGPASSWORD

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.File({ filename: 'combined.log' })
  ]
});



const sequelize = new Sequelize(`${PGDATABASE}`, `${PGUSER}`, `${PGPASSWORD}`, {
  host: PGHOST,
  dialect: 'postgres',
  logging: msg => logger.log('debug', msg)
});


sequelize.sync({ alter: true })


export default sequelize




 