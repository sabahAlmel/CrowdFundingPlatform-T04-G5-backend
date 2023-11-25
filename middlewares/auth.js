import jwt from 'jsonwebtoken'
import 'dotenv/config'
export function authorize(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data  = jwt.verify(token, process.env.TOKEN)
    req.userId = data.id
    req.userRole = data.role
    return next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(403)
  }
}
export function logOut(req,res){
  return res.clearCookie('access_token').status(200).json({message: "Successfully Logged Out!"})
}

