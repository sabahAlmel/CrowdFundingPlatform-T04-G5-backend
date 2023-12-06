import jwt from "jsonwebtoken";
import "dotenv/config";

export async function authenticate(req, res, next) {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).send("No token");
    }
    const decoded = jwt.verify(token, process.env.TOKEN);
    res.user = decoded;
    next();
    console.log("authenticate");
  } catch (error) {
    console.log(error);
  }
}
export function logOut(req, res) {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully Logged Out!" });
}
