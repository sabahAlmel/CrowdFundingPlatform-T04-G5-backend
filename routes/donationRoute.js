import express from 'express'
import { createDonation, getDonations } from '../controllers/donationsConroller.js'
import { checkBalance } from '../middlewares/donationsMidware.js'

const donationRouter = express.Router()

donationRouter.post('/add', checkBalance, createDonation)
donationRouter.get('/read', getDonations)


export default donationRouter