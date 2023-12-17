const jwt=require('jsonwebtoken')

//generate token
const generateToken=(id)=>{
  const token=jwt.sign({id},'secret',{
    expiresIn:"30d"
  })
  return token
}

//protected route
const requireSignIn=(req,res,next)=>{
  try{
    const decode=jwt.verify(req.headers.authorization,'secret')
    req.user=decode
    next()
  }catch(err){
    console.log(err);
  }
}

module.exports={
  generateToken,
  requireSignIn
}