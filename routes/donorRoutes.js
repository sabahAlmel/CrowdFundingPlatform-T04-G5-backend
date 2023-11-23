import express from 'express'
import { addDonor, editDonor, readDonors } from '../controllers/donorControllers.js'
import { paginate } from '../middlewares/donor.js'

const donorRouter = express.Router()

donorRouter.post('/add', addDonor)
donorRouter.patch('/edit', editDonor)
donorRouter.get('/', paginate, readDonors)


export default donorRouter