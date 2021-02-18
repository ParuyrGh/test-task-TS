import { Router } from 'express'
import DB from "./model/DB_associations"
import UserControler from "./controllers/UserController"
import BitcoinController from './controllers/BitcoinController';

const router = Router()

router.get('/users/:id', UserControler.getUser)
router.post('/users', UserControler.signUp)
router.put('/users/:id', UserControler.updateUser)
router.post('/users/:userid/usd', UserControler.updateBalance)
router.post('/users/:userid/bitcoin', UserControler.exchangeBTC)
router.get('/users/:userid/balance', UserControler.getBalance)

router.put('/bitcoin', BitcoinController.updateBTC)
router.get('/bitcoin', BitcoinController.getBTC)




export default router