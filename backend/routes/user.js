const express = require('express')
const router = express.Router()
const { User, Account } = require('../db')
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require('zod');
const authMiddlware = require('../middleware');
const app = express()

router.use(express.json())

const signupBody = zod.object({
    username : zod.string().email(),
    firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post('/signup',async (req,res)=>{
    const { success } = signupBody.safeParse(req.body)
    console.log(success)
    console.log(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const username = req.body.username
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password
    const userExists = await User.findOne({username:username})
    if(userExists){
        return res.status(411).json({
            message: 'Email already taken'
        })
    }

    const user = await User.create({
        username:username,
        firstName:firstName,
        lastName:lastName,
        password:password
    })
    
    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET)

    const randomNumber = Math.floor(Math.random() * 10000) + 1;

    Account.create({
        userId: user._id,
        balance : randomNumber
    })

    res.json({
        message: 'User created successfully',
        token: token
    })
})


const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post('/signin',async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:'Incorrect inputs'
        })
    }
    const user = await User.findOne({
        username: username,
        password : password
    })
    if(!user._id){
        return res.status(411).json({
            message: 'Error while logging in'
        })
       
    }

    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        token: token
    })
    return;
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.put('/',authMiddlware,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:'Invalid input'
        })
    }
    await User.updateOne({_id:req.userId},req.body)

    res.json({
        message:'Updated succesfully'
    })
})

router.get('/bulk',authMiddlware,async (req,res)=>{
    const filter = req.query.filter || '';
    const users = await User.find({
        $or:[{
            firstName:{
                '$regex':filter
            }
        },{
            lastName:{
                '$regex':filter
            }
        }]
    })
    res.json({
        user: users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName: user.lastName,
            _id:user._id
        }))
    })
})

module.exports = router