import express from 'express'
import { addDonor, editDonor, readDonors } from '../controllers/donorControllers.js'
import { paginate } from '../middlewares/donor.js'

const donorRouter = express.Router()

donorRouter.post('/add', addDonor)
donorRouter.patch('/deposit', editDonor)
donorRouter.get('/', paginate, readDonors)
// donorRouter.delete('/delete', deleteDonor)


export default donorRouter