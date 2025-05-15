const express = require('express')
const authMiddlware = require('../middleware')
const {Account} = require('../db')
const { default: mongoose } = require('mongoose')
const router = express.Router()

router.use(express.json())

router.get('/balance',authMiddlware,async (req,res)=>{
    const account = await Account.findOne({userId:req.userId})
    res.json({
        balance: account.balance
    })
})

router.post('/transfer',authMiddlware,async(req,res)=>{
    const session = await mongoose.startSession();

     session.startTransaction();

    const fromAccount = req.userId
    const to = req.body.to
    const amount = req.body.amount

    const account = await Account.findOne({userId:fromAccount}).session(session)


    if(!account || account.balance<amount){
        session.abortTransaction()
        return res.status(400).json({
            message:'Insufficient balance'
        })
    }

    const toAccount = await Account.findOne({userId:to}).session(session)

    if(!toAccount){
         session.abortTransaction()
        return res.status.json({
            message:'Invalid account'
        })
    }

    await Account.findOneAndUpdate({userId:fromAccount},{$inc:{balance: -amount}}).session(session)
    await Account.findOneAndUpdate({userId:to},{$inc:{balance:amount}}).session(session)

     session.commitTransaction()
    res.json({
        message:'Transfer Successful'
    })

})



module.exports = router