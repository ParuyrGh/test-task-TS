import DB from "../model/DB_associations"
import { Request, Response } from "express";


class UserControler {


    signUp(req: Request, res: Response) {

        DB.User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        }).then(({ id, bitcoinAmount, usdBalance, updatedAt, createdAt }) => {
            res.send({
                id,
                bitcoinAmount,
                usdBalance,
                updatedAt,
                createdAt
            });
        }).catch(eror => {
            res.status(400).send(eror)
        });
    }

    getUser(req: Request, res: Response) {
        let id: number = Number(req.params.id)
        if (id) {
            DB.User.findOne({
                where: {
                    id: req.params.id
                }
            }).then((user) => {
                if (user) {
                    res.send({ user });
                } else {
                    res.status(404).send({ error: 'user not Found' })
                }
            }).catch(eror => {
                res.status(400).send(eror)
            });

        } else res.status(404).send({ error: 'Enter currect Id' })

    }

    async updateUser(req: Request, res: Response) {
        let id: number = Number(req.params.id)
        if (id) {
            let user = await DB.User.findOne({
                where: { id: id }
            })
            if (user) {
                user.name = req.body?.name ? req.body?.name : user.name;
                user.username = req.body?.username ? req.body.username : user.username;
                user.email = req.body?.email ? req.body?.email : user.email;

                user.save()
                    .then((user) => {
                        res.send(user)
                    })
                    .catch((error) => {
                        res.status(400).send(error)
                    });

            } else res.status(404).send({ error: 'user not Found' })
        } else res.status(404).send({ error: 'Enter currect Id' })

    }
    async updateBalance(req: Request, res: Response) {
        let id: number = Number(req.params.userid)
        let amount: number = Number(req.body.amount)
        if (id && amount) {
            let user = await DB.User.findOne({
                where: { id: id }
            })
            if (user) {
                if (req.body.action === "withdraw") {
                    if (user.usdBalance >= amount) {
                        user.usdBalance = user.usdBalance - amount
                    } else {
                        return res.status(400).send({ error: "Your Balance is Not enuff" })
                    }
                } else if (req.body.action === "deposit") {
                    user.usdBalance = user.usdBalance + amount
                } else {
                    return res.status(400).send({ error: "Enter currect Action" })
                }

                user.save()
                    .then((user) => {
                        res.send(user)
                    })
                    .catch((error) => {
                        res.status(400).send(error)
                    });

            } else res.status(404).send({ error: 'user not Found' })
        } else res.status(404).send({ error: 'Enter currect Id or Amount' })

    }

    async exchangeBTC(req: Request, res: Response) {

        let id: number = Number(req.params.userid)
        let amount: number = Number(req.body.amount)
        if (id && amount) {
            let user = await DB.User.findOne({
                where: { id: id }
            })
            let course = await DB.Bitcoin.findOne()

            if (user && course) {
                if (req.body.action === "sel") {
                    if (user.bitcoinAmount >= amount) {
                        user.usdBalance = user.usdBalance + (course.price * amount)
                        user.bitcoinAmount = user.bitcoinAmount - amount
                    } else {
                        return res.status(400).send({ error: "Your BTC Balance is Not enuff" })
                    }
                } else if (req.body.action === "buy") {
                    if (user.usdBalance >= amount * course.price) {
                        user.bitcoinAmount = user.bitcoinAmount + amount
                        user.usdBalance = user.usdBalance - amount * course.price
                    } else {
                        return res.status(400).send({ error: "Your USD Balance is Not enuff" })
                    }
                } else {
                    return res.status(400).send({ error: "Enter currect Action" })
                }
                user.save()
                    .then((user) => {
                        res.send(user)
                    })
                    .catch((error) => {
                        res.status(400).send(error)
                    });
            } else res.status(404).send({ error: 'user not Found' })
        } else res.status(404).send({ error: 'Enter currect Id' })
    }

    async getBalance(req: Request, res: Response) {
        let id: number = Number(req.params.userid)
        console.log(id)
        let course = await DB.Bitcoin.findOne()
        if (id) {
            let user = await DB.User.findOne({
                where: { id }
            })
            if (user && course) {
                let totalbalance: number = user.usdBalance + user.bitcoinAmount * course.price
                res.send({ totalbalance });
            } else {
                res.status(404).send({ error: 'user not Found' })
            }
        } else res.status(404).send({ error: 'Enter currect Id' })

    }


}

export default new UserControler