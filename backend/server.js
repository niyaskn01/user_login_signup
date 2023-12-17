const express=require('express')
const dotenv=require('dotenv').config()
const cors=require('cors')
const db=require('./config/connect')
const userRouter=require('./routes/userRoutes')
const app=express()

app.use(cors())
app.use(express.json())
db()

app.use('/user',userRouter)

const port=process.env.PORT || 8080

app.listen(port,()=>{
  console.log('server is running at port ',port);
})