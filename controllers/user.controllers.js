import fs from "fs";
import User from "../models/User.models.js";
import Donor from "../models/donor.js";
import Creator from "../models/Creator.models.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import Admin from "../models/adminModel.js";

function removeImage(image) {
  fs.unlinkSync(`public/images/${image}`, (err) => {
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
        : role === "admin"
        ? { include: Admin, where: { role: "admin" } }
        : { include: Donor, where: { role: "donor" } };
  }
  let getAll = await User.findAll({
    ...options,
    order: req.sort,
    include: Object.values(User.associations),
    offset: req.offset,
    limit: req.limit,
  });
  return res.status(200).json(getAll);
}

async function addNewUser(req, res) {
  let user = req.body;
  user.role = req.body.role || "donor";
  let image;
  if (!req.file) {
    req.file = { filename: "user.jpg" };
    image = req.file.filename;
  } else {
    image = req.file.filename;
  }

  try {
    if (!user.firstName || !user.lastName || !user.userName || !user.password) {
      return res.status(400).json({ error: "missing required property" });
    } else {
      let passExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      let userNameExpression = /^[a-zA-Z][a-zA-Z0-9]{5,11}$/;
      if (!user.password.match(passExpression)) {
        return res.status(400).json({
          error:
            "password should start with letter and has 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });
      }
      if (!user.userName.match(userNameExpression)) {
        return res.status(400).json({
          error:
            "Invalid username. Please ensure it starts with a letter, is between 6 and 12 characters, and contains at least one numeric digit.",
        });
      } else {
        let findUser = await User.findOne({
          where: { userName: user.userName },
        });
        if (findUser) {
          return res.status(400).json({ error: "userName is already exist" });
        } else {
          const hashedPass = await bcrypt.hash(user.password, 10);
          user.image = image;
          try {
            const hashedPass = await bcrypt.hash(user.password, 10);
            const newUser = await User.create({
              ...user,
              password: hashedPass,
              role: user.role,
            });
            if (user.role === "donor") {
              const newDonor = await Donor.create();
              await newDonor.setUser(newUser);
              await newUser.save();
              await newDonor.save();
              return res.json({ user: newUser, donor: newDonor });
            } else if (user.role === "creator") {
              console.log('creator')
              const newCreator = await Creator.create();
              await newCreator.setUser(newUser);
              await newUser.save();
              await newCreator.save();
              return res.json({ user: newUser, creator: newCreator });
            } else {
              const newAdmin = await Admin.create();
              await newAdmin.setUser(newUser);
              await newAdmin.save();
              await newUser.save();
              res.json({ data: newUser, admin: newAdmin });
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

async function updateUser(req, res) {
  const user = req.body;
  let newImage;
  user.id = req.userId;

  const found = await User.findOne({ where: { id: user.id } });
  if (!req.file) {
    newImage = found.image;
  } else if (req.file) {
    const oldImage = found.image;
    newImage = req.file.filename;
    removeImage(oldImage);
  }
  if (!found) {
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(400).json({ error: "id not found" });
  }
  if (user.userName) {
    return res.status(400).json({ error: "you can't update your username" });
  }
  if (req.userRole !== "admin") {
    if (user.role) {
      return res.status(400).json({ error: "you can't change your role" });
    }
  }
  try {
    user.image = newImage;
    if (user.password) {
      const hashedPass = await bcrypt.hash(user.password, 10);
      user.password = hashedPass;
    }
    await User.update({ ...user }, { where: { id: user.id } });

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
  let id;
  if (req.userRole == "admin") {
    id = req.body.id;
  } else {
    id = req.userId;
  }
  User.findOne({ where: { id: id } }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    } else {
      const image = user.image;
      return user
        .destroy()
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
async function getOneUser(req, res) {
  try {
    const data = await User.findByPk(req.user.userId, {
      include: Object.values(User.associations),
    });
    console.log(data);
    res.json({ user: data });
  } catch (error) {
    console.log(error);
  }
}
export { getAllUsers, addNewUser, updateUser, deleteUser, getOneUser };
