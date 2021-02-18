"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_associations_1 = require("../model/DB_associations");
class BitcoinControler {
    updateBTC(req, res) {
        DB_associations_1.default.Bitcoin.findOrCreate({
            where: {},
            defaults: {
                price: req.body.price
            }
        })
            .then(([bitcoin, created]) => {
            if (!created) {
                bitcoin.price = req.body.price;
                bitcoin.save()
                    .then((btc) => {
                    res.send({
                        price: btc.price,
                        updatedAt: btc.updatedAt
                    });
                })
                    .catch((error) => {
                    res.status(400).send(error);
                });
            }
            else {
                res.send({
                    price: bitcoin.price,
                    updatedAt: bitcoin.updatedAt
                });
            }
        })
            .catch(error => {
            res.status(400).send(error);
        });
    }
    getBTC(req, res) {
        DB_associations_1.default.Bitcoin.findAll()
            .then((bitcoin) => {
            let price = bitcoin[0].price;
            let updatedAt = bitcoin[0].updatedAt;
            res.send({
                price,
                updatedAt
            });
        })
            .catch(error => {
            res.status(400).send(error);
        });
    }
}
exports.default = new BitcoinControler;
//# sourceMappingURL=BitcoinController.js.map