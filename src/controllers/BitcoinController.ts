import DB from "../model/DB_associations"
import { Request, Response } from "express";

class BitcoinControler {

    updateBTC(req: Request, res: Response) {
        DB.Bitcoin.findOrCreate({
            where: {},
            defaults: {
                price: req.body.price
            }
        })
            .then(([bitcoin, created]) => {
                if (!created) {
                    bitcoin.price = req.body.price
                    bitcoin.save()
                        .then((btc) => {
                            res.send({
                                price: btc.price,
                                updatedAt: btc.updatedAt
                            })
                        })
                        .catch((error) => {
                            res.status(400).send(error)
                        })
                } else {
                    res.send({
                        price: bitcoin.price,
                        updatedAt: bitcoin.updatedAt
                    })
                }
            })
            .catch(error => {
                res.status(400).send(error)
            })
    }

    getBTC(req: Request, res: Response) {
        DB.Bitcoin.findAll()
            .then((bitcoin) => {
                let price: number = bitcoin[0].price
                let updatedAt: Date = bitcoin[0].updatedAt
                res.send({
                    price,
                    updatedAt
                })
            })
            .catch(error => {
                res.status(400).send(error)
            })
    }

}

export default new BitcoinControler