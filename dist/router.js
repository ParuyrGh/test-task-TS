"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controllers/UserController");
const BitcoinController_1 = require("./controllers/BitcoinController");
const router = express_1.Router();
router.get('/users/:id', UserController_1.default.getUser);
router.post('/users', UserController_1.default.signUp);
router.put('/users/:id', UserController_1.default.updateUser);
router.post('/users/:userid/usd', UserController_1.default.updateBalance);
router.post('/users/:userid/bitcoin', UserController_1.default.exchangeBTC);
router.get('/users/:userid/balance', UserController_1.default.getBalance);
router.put('/bitcoin', BitcoinController_1.default.updateBTC);
router.get('/bitcoin', BitcoinController_1.default.getBTC);
exports.default = router;
//# sourceMappingURL=router.js.map