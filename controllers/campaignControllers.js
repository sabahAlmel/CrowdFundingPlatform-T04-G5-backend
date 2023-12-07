import Campaign from "../models/campaignModel.js";
import fs from "fs";
import Category from "../models/categoryModel.js";
import Creator from "../models/Creator.models.js";
import { where } from "sequelize";
import User from "../models/User.models.js";
import Donations from "../models/donations.js";
import Donor from "../models/donor.js";

// Get All Campaigns

const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      include: [
        Category,
        { model: Creator, include: User },
        {
          model: Donations,
          include: [{ model: Donor, include: User }],
        },
        { model: Creator, include: User },
      ],
      offset: req.offset,
      limit: req.limit,
    });
    res.json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Campaigns by creator Id

const getCampaignsByCreatorId = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      where: { CreatorId: req.userId },
    });
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific Campaign

const getOneCampaign = async (req, res) => {
  const campaignId = req.params.id;

  try {
    const campaign = await Campaign.findOne({ where: { id: campaignId } });

    if (campaign) {
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ error: "Campaign not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Campaigns by category

const getCampaignsByCategory = async (req, res) => {
  const categoryName = req.params.category;

  console.log(categoryName);

  try {
    const category = await Category.findOne({ where: { name: categoryName } });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const campaigns = await Campaign.findAll({
      where: { categoryId: category.id },
      include: [{ model: Category, attributes: ["name"] }],
    });

    res.json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new Campaign

const createCampaign = async (req, res) => {
  const {
    title,
    target,
    description,
    amountContributed,
    status,
    categoryName,
  } = req.body;

  if (!req.file) {
    req.file = { filename: "campaign.png" };
  }

  const image = req.file.filename;
  const creator = await Creator.findOne({ where: { id: req.user.roleId } });

  try {
    const category = await Category.findOne({ where: { name: categoryName } });

    const newCampaign = await Campaign.create({
      title,
      target,
      description,
      amountContributed,
      status,
      image,
    });

    await newCampaign.setCategory(category);
    await newCampaign.setCreator(creator);

    await newCampaign.save();
    res.status(201).json(newCampaign);
    console.log(newCampaign);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
    const path = `public/images/${req.file.filename}`;
    fs.unlinkSync(path);
  }
};

// Update a Campaign

const updateCampaign = async (req, res) => {
  const campaignId = req.params.id;

  const oldCampaign = await Campaign.findOne({ where: { id: campaignId } });

  try {
    const updatedData = req.body;

    const oldImagePath = `public/images/${oldCampaign.image}`;

    if (req.file) {
      updatedData.image = req.file.filename;

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: `error deleting the old image` });
        }
      });
    }

    await oldCampaign.update(updatedData);

    res.status(200).json({ message: "Campaign updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error , ${error.message}` });
  }
};

// Delete a specific Campaign

const deleteCampaign = async (req, res) => {
  const campaignId = req.params.id;

  try {
    const campaignToDelete = await Campaign.findOne({
      where: { id: campaignId },
    });

    if (!campaignToDelete) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    await campaignToDelete.destroy();

    const oldImagePath = `public/images/${campaignToDelete.image}`;

    fs.unlink(oldImagePath, (err) => {
      if (err) {
        return res.status(500).json({ error: `error deleting the old image` });
      }
    });

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
async function getPendingCampaigns(req, res) {
  try {
    const data = await Campaign.findAll({
      include: Category,
      where: { status: "pending" },
    });
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
}

export {
  getAllCampaigns,
  createCampaign,
  getOneCampaign,
  getCampaignsByCategory,
  updateCampaign,
  deleteCampaign,
  getPendingCampaigns,
  getCampaignsByCreatorId,
};
