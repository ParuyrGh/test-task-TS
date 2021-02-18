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
const DB_associations_1 = require("../model/DB_associations");
class UserControler {
    signUp(req, res) {
        DB_associations_1.default.User.create({
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
            res.status(400).send(eror);
        });
    }
    getUser(req, res) {
        let id = Number(req.params.id);
        if (id) {
            DB_associations_1.default.User.findOne({
                where: {
                    id: req.params.id
                }
            }).then((user) => {
                if (user) {
                    res.send({ user });
                }
                else {
                    res.status(404).send({ error: 'user not Found' });
                }
            }).catch(eror => {
                res.status(400).send(eror);
            });
        }
        else
            res.status(404).send({ error: 'Enter currect Id' });
    }
    updateUser(req, res) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            let id = Number(req.params.id);
            if (id) {
                let user = yield DB_associations_1.default.User.findOne({
                    where: { id: id }
                });
                if (user) {
                    user.name = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.name) ? (_b = req.body) === null || _b === void 0 ? void 0 : _b.name : user.name;
                    user.username = ((_c = req.body) === null || _c === void 0 ? void 0 : _c.username) ? req.body.username : user.username;
                    user.email = ((_d = req.body) === null || _d === void 0 ? void 0 : _d.email) ? (_e = req.body) === null || _e === void 0 ? void 0 : _e.email : user.email;
                    user.save()
                        .then((user) => {
                        res.send(user);
                    })
                        .catch((error) => {
                        res.status(400).send(error);
                    });
                }
                else
                    res.status(404).send({ error: 'user not Found' });
            }
            else
                res.status(404).send({ error: 'Enter currect Id' });
        });
    }
    updateBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = Number(req.params.userid);
            let amount = Number(req.body.amount);
            if (id && amount) {
                let user = yield DB_associations_1.default.User.findOne({
                    where: { id: id }
                });
                if (user) {
                    if (req.body.action === "withdraw") {
                        if (user.usdBalance >= amount) {
                            user.usdBalance = user.usdBalance - amount;
                        }
                        else {
                            return res.status(400).send({ error: "Your Balance is Not enuff" });
                        }
                    }
                    else if (req.body.action === "deposit") {
                        user.usdBalance = user.usdBalance + amount;
                    }
                    else {
                        return res.status(400).send({ error: "Enter currect Action" });
                    }
                    user.save()
                        .then((user) => {
                        res.send(user);
                    })
                        .catch((error) => {
                        res.status(400).send(error);
                    });
                }
                else
                    res.status(404).send({ error: 'user not Found' });
            }
            else
                res.status(404).send({ error: 'Enter currect Id or Amount' });
        });
    }
    exchangeBTC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = Number(req.params.userid);
            let amount = Number(req.body.amount);
            if (id && amount) {
                let user = yield DB_associations_1.default.User.findOne({
                    where: { id: id }
                });
                let course = yield DB_associations_1.default.Bitcoin.findOne();
                if (user && course) {
                    if (req.body.action === "sel") {
                        if (user.bitcoinAmount >= amount) {
                            user.usdBalance = user.usdBalance + (course.price * amount);
                            user.bitcoinAmount = user.bitcoinAmount - amount;
                        }
                        else {
                            return res.status(400).send({ error: "Your BTC Balance is Not enuff" });
                        }
                    }
                    else if (req.body.action === "buy") {
                        if (user.usdBalance >= amount * course.price) {
                            user.bitcoinAmount = user.bitcoinAmount + amount;
                            user.usdBalance = user.usdBalance - amount * course.price;
                        }
                        else {
                            return res.status(400).send({ error: "Your USD Balance is Not enuff" });
                        }
                    }
                    else {
                        return res.status(400).send({ error: "Enter currect Action" });
                    }
                    user.save()
                        .then((user) => {
                        res.send(user);
                    })
                        .catch((error) => {
                        res.status(400).send(error);
                    });
                }
                else
                    res.status(404).send({ error: 'user not Found' });
            }
            else
                res.status(404).send({ error: 'Enter currect Id' });
        });
    }
    getBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = Number(req.params.userid);
            console.log(id);
            let course = yield DB_associations_1.default.Bitcoin.findOne();
            if (id) {
                let user = yield DB_associations_1.default.User.findOne({
                    where: { id }
                });
                if (user && course) {
                    let totalbalance = user.usdBalance + user.bitcoinAmount * course.price;
                    res.send({ totalbalance });
                }
                else {
                    res.status(404).send({ error: 'user not Found' });
                }
            }
            else
                res.status(404).send({ error: 'Enter currect Id' });
        });
    }
}
exports.default = new UserControler;
//# sourceMappingURL=UserController.js.map