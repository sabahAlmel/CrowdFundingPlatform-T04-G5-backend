// import User from "../models/user.js";
import fs from "fs";
import User from "../models/User.models.js";
import Donor from "../models/donor.js";

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
  let getAll = await User.findAll({ include: "DonorId" });
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
    user.image = image;

    try {
      const newUser = await User.create(user);
      if (user.role === "donor") {
        const newDonor = await Donor.create();
        await newDonor.setUser(newUser);
        return res.json({ user: newUser, donor: newDonor });
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
