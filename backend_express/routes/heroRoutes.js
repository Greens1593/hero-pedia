import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Hero from "../mongodb/models/hero.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL HEROES

router.route("/").get(async (req, res) => {
  try {
    const heroes = await Hero.find({});
    res.status(200).json(heroes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//GET HERO BY ID

router.route("/:id").get(async (req, res) => {
  try {
    const heroId = req.params.id;
    const hero = await Hero.findById(heroId);

    if (!hero) {
      return res.status(404).json({ error: "Hero not found" });
    }

    res.status(200).json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//CREATE A HERO

router.route("/").post(async (req, res) => {
  console.log(req.files);
  try {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No images found" });
    }

    const uploadedImages = [];

    for (const fileKey in req.files) {
      const file = req.files[fileKey];
      const result = await cloudinary.uploader.upload(file.path);
      uploadedImages.push(result.secure_url);
    }

    const newHero = new Hero({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: uploadedImages,
    });

    const savedHero = await newHero.save();

    res.json(savedHero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// DELETE A HERO
router.delete("/:id", async (req, res) => {
  try {
    const heroId = req.params.id;
    const deletedHero = await Hero.findByIdAndDelete(heroId);

    if (!deletedHero) {
      return res.status(404).json({ error: "Hero not found" });
    }

    res.json({ message: "Hero deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
