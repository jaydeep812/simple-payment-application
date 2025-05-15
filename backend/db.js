const mongoose = require('mongoose')
const { number } = require('zod')
const dotenv = require('dotenv')

dotenv.config({path:'.env'})

mongoose.connect(process.env.MONGO_URI)

const userSchema = new mongoose.Schema({
    username : String,
    firstName : String,
    lastName : String,
    password : String
})

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required: true
    },
    balance : {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
}