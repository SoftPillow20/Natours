import fs from "fs";
import { configDotenv } from "dotenv";
configDotenv({ path: "./config.env" });

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { Tour } from "../../models/tourModel.js";

import mongoose from "mongoose";

await mongoose.connect(process.env.DATABASE);

// READ JS FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded");
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted");
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
