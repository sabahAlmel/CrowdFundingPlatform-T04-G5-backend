import express from 'express'
import { createDonation } from '../controllers/donationsConroller.js'

const donationRouter = express.Router()

donationRouter.post('/add', createDonation)


export default donationRouter