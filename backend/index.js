const express = require("express");
const cors = require('cors')
const rootRouter = require('./routes/index')
const PORT = 3000

const app = express()
app.use(cors());


app.use('/api/v1',rootRouter)
app.use(express.json())



app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
