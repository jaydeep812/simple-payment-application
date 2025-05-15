const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config')


const authMiddlware = (req,res,next)=>{
    const token  = req.headers.authorization
    if(!token || !token.startsWith('Bearer')){
        res.status(403).json({
            message:'Incorrect input'
        })
    }
    const words = token.split(' ')
    const jwt_token = words[1]
    jwt.verify(jwt_token,JWT_SECRET,(err,decoded)=>{
        if(err){
            res.status(403).json({
                message: 'Invalid Token'
            })
            return;
        }
        req.userId = decoded.userId;
        next();
    })
}

module.exports = authMiddlware