import express from 'express'
import { addDonor, editDonor, readDonors } from '../controllers/donorControllers.js'

const donorRouter = express.Router()

donorRouter.post('/add', addDonor)
donorRouter.patch('/edit', editDonor)
donorRouter.get('/', readDonors)


export default donorRouter