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

//GET ALL POSTS

router.route("/").get(async (req, res) => {
  try {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    } = req.body;

    const uploadedImages = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image);
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

//CREATE A POST

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name: name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (e) {
    res.status(500).json({ success: false, message: e });
  }
});

export default router;
