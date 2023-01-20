import express from "express";
import { Album } from "../models";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("api endpoint");
});

router.get("/albums", async (req, res) => {
  // let message = 'heythere'

  try {
    let albumList = await Album.find({}).sort("albumTitle").exec();
    console.log({ albumList });
    res.json(albumList);
  } catch (error) {
    console.log(error);
  }
});

router.post("/albums", async (req, res) => {
  const {
    albumTitle,
    albumCoverURL,
    bandName,
    bandMembers,
    songList,
    yearPublished,
  } = req.body;

  try {
    const newAlbum = new Album({
      albumTitle: albumTitle,
      albumCoverURL: albumCoverURL,
      bandName: bandName,
      bandMembers: bandMembers,
      songList: songList,
      yearPublished: yearPublished,
    });

    const savedAlbum = await newAlbum.save();
    res.json(savedAlbum);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteAlbum/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Album.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
