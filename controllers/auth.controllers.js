import jwt from "jsonwebtoken";
import "dotenv/config";

export async function authenticate(req, res) {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).send("No token");
    }
    const decoded = jwt.verify(token, process.env.TOKEN);
    res.user = decoded;
  } catch (error) {
    console.log(error);
  }
}
export const checkRoles = (roles) => (req, res, next) => {
  if (req.user && roles.includes(req.user.role)) {
    next();
  } else {
    res
      .status(403)
      .json({
        message: "Forbidden: You do not have the required permissions.",
      });
  }
};
