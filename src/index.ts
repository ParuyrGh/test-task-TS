import * as express from 'express';
import * as bodyParser from 'body-parser'
import router from "./router"
import * as dotenv from "dotenv";
import * as expressWinston from 'express-winston'
import * as  winston from 'winston'
dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 3030

app.use(bodyParser.urlencoded({
    extended: false,
}))

app.use(bodyParser.json())
app.use(express.json());


router.get('/error', function (req, res, next) {
    return next(new Error("This is an error and it should be logged to the console"));
});

app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: 'combined.log' }),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));


app.use(router)

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: 'combined.log' })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));


app.listen(PORT, function () {
    console.log(`Server started At Port${PORT}`);
});