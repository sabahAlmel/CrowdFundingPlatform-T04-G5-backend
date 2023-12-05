import jwt from "jsonwebtoken";
import "dotenv/config";
export function authorize(req, res, next) {
  const token = req.cookies.access_token;
  console.log(token)
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN);
    req.roleId = data.roleId;
    req.userRole = data.role;
    req.userId = data.userId;
    console.log(data)
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
}
export function logOut(req, res) {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully Logged Out!" });
}
export function isAdmin(req,res,next){
  if(req.userRole !== 'admin'){
    return res.status(401).send('Not Auhtorized')
  }else{
    next()
  }
}
export function isCreator(req,res,next){
  if(req.userRole !== 'creator'){
    return res.status(401).send('Not Auhtorized')
  }else{
    next()
  }
}
export function isDonor(req,res,next){
  if(req.userRole !== 'donor'){
    return res.status(401).send('Not Auhtorized')
  }else{
    next()
  }
}