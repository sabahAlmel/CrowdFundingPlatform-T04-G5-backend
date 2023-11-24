import User from "../models/User.models.js";
import bcrypt from "bcrypt";

export async function signIn(req, res) {
  const { userName, password } = req.body;
  const user = await User.findOne({ where: { userName: userName } });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      res.json({ data: user });
      return user;
    }
    res.json({ message: "incorrect password" });
  }
  res.json({ message: "incorrect username" });
}

// function logout(req, res) {
//   res.cookie("jwt", "", { maxAge: 1 });
//   res.redirect("/login");
// }
