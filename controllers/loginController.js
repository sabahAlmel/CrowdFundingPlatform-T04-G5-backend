import User from "../models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";


export async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send("All inputs are required");
    }
    const user = await User.findOne({
      where: { userName: username },
      include: Object.values(User.associations),
    });
    if (!user) {
      res.status(400).json({ message: "User Not Found!" });
    } else {
      console.log(user);
      const id =
        user.role === "creator"
          ? user.Creator.id
          : user.role === "admin"
          ? user.Admin.id
          : user.Donor.id;

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { roleId: id, role: user.role, userId: user.id },
          process.env.TOKEN,
          { expiresIn: "2h" }
        );
        user.token = token;
        res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json(user);
      } else {
        res.send("Wrong credentials");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
