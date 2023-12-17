const dotenv=require('dotenv').config()
const mongoURL=process.env.MONGO_URL

const mongoose=require('mongoose')
const connect=()=>{
  try {
    mongoose.connect(mongoURL)
    console.log('connected with database')
  } catch (error) {
    console.log(error);
  }
}

module.exports=connect 