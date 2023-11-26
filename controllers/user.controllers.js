// import User from "../models/user.js";
import fs from "fs";
import User from "../models/User.models.js";
import Donor from "../models/donor.js";
import Creator from "../models/Creator.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

function removeImage(image) {
  fs.unlinkSync(image, (err) => {
    if (err) {
      console.log(`we can't delete the image`);
    } else {
      console.log("image deleted");
    }
  });
}

async function getAllUsers(req, res) {
  const role = req.query.role;
  let options;
  if (role) {
    options =
      role === "creator"
        ? { include: Creator, where: { role: "creator" } }
        : { include: Donor, where: { role: "Donor" } };
  }
  console.log(options);
  let getAll = await User.findAll({
    include: Creator,
    where: { role: "creator" },
  });
  return res.status(200).json(getAll);
}

async function addNewUser(req, res) {
  let user = req.body;
  const image = req.file.path;
  if (
    !user.firstName ||
    !user.lastName ||
    !user.userName ||
    !user.password ||
    !user.role
  ) {
    if (image) {
      removeImage(image);
    }
    return res.status(400).json({ error: "missing required property" });
  } else if (!image) {
    return res.status(400).json({ error: "missing image" });
  } else {
    // const token = createToken(user.id);
    const hashedPass = await bcrypt.hash(user.password, 10);
    user.image = image;
    try {
      const hashedPass = await bcrypt.hash(user.password, 10);
      const newUser = await User.create({ ...user, password: hashedPass });
      if (user.role === "donor") {
        const newDonor = await Donor.create();
        const token = jwt.sign(
          { id: newUser.id, role: "donor" },
          process.env.TOKEN,
          { expiresIn: "2h" }
        );
        newDonor.token = token;
        await newDonor.setUser(newUser);
        await newUser.save();
        await newDonor.save();
        return res.json({ user: newUser, donor: newDonor });
      } else if (user.role === "creator") {
        const newCreator = await Creator.create();
        const token = jwt.sign(
          { id: newUser.id, role: "creator" },
          process.env.TOKEN,
          { expiresIn: "2h" }
        );
        newCreator.token = token;
        await newCreator.setUser(newUser);
        await newUser.save();
        await newCreator.save();
        return res.json({ user: newUser, creator: newCreator });
      } else {
        const token = jwt.sign(
          { id: newUser.id, role: "admin" },
          process.env.TOKEN,
          { expiresIn: "2h" }
        );
        user.token = token;
        await user.save();
        res.json({ data: newUser });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function updateUser(req, res) {
  const user = req.body;
  user.id = req.params.id;
  const newImage = req.file.path;
  const found = await User.findOne({ where: { id: user.id } });
  if (!found) {
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(400).json({ error: "id not found" });
  }
  const oldImage = found.image;
  try {
    if (oldImage !== newImage) {
      user.image = newImage;
      await User.update({ ...user }, { where: { id: user.id } });
      if (oldImage) {
        removeImage(oldImage);
      }
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("could not update user " + err);
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(500).json({ error: "server error" });
  }
}

function deleteUser(req, res) {
  let id = req.params.id;
  User.findOne({ where: { id: id } }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    } else {
      const image = user.image;
      return User.destroy({
        where: { id: id },
      })
        .then(() => {
          removeImage(image);
          console.log("Successfully deleted record.");
          res.status(200).json("deleted");
        })
        .catch((error) => {
          console.error("Failed to delete record : ", error);
          res.status(400).json("not deleted");
        });
    }
  });
}
export { getAllUsers, addNewUser, updateUser, deleteUser };
