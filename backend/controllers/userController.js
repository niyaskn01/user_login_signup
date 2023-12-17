const { hashPassword, comparePassword } = require('../helpers/userHelper')
const { generateToken } = require('../middlewares/authMiddleware')
const userModel=require('../model/userModel')


//register
const userRegisterController=async(req,res)=>{
  const {name,email,password}=req.body
  if(!name) return res.send({message:'name is required'})
  if(!email) return res.send({message:'email is required'})
  if(!password) return res.send({message:'password is required'})

  try {
    const existingUser=await userModel.findOne({email})
    if(existingUser) return res.send({message:'user already exists,please login'})

    //hashpassword
    const hashedPassword=await hashPassword(password)

    const user=await new userModel({name,email,password:hashedPassword}).save()

    //generate token
    const token=generateToken(user._id)

    res.status(200).send({
      success:true,
      message:'created new user',
      user,token
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:'error in registration',
      error
    })
  }
}

//login
const userLoginController=async(req,res)=>{
  const {email,password}=req.body
  if(!email || !password) return res.send({message:'invalid email or password'})
  try {
    const user=await userModel.findOne({email})
    if(!user) return res.send({message:'invalid email'})

    //compare passsword
    validUser=await comparePassword(password,user.password)
    if(!validUser) return res.send({message:'invalid password'})

    const token=generateToken(user._id)
    res.status(200).send({
      success:true,
      message:'login successfull',
      user,token
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:'error in login',
      error
    })
  }
}

module.exports={
  userRegisterController,
  userLoginController
}