"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const router_1 = require("./router");
const dotenv = require("dotenv");
const expressWinston = require("express-winston");
const winston = require("winston");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(express.json());
router_1.default.get('/error', function (req, res, next) {
    return next(new Error("This is an error and it should be logged to the console"));
});
app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: 'combined.log' }),
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json())
}));
app.use(router_1.default);
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: 'combined.log' })
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json())
}));
app.listen(PORT, function () {
    console.log(`Server started At Port${PORT}`);
});
//# sourceMappingURL=index.js.map