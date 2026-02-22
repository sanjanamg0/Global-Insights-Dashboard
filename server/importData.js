const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Insight = require("./models/Insight");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    const data = JSON.parse(
      fs.readFileSync("./data/jsondata.json", "utf-8")
    );

    await Insight.deleteMany();
    await Insight.insertMany(data);

    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error("Import failed");
    console.error(error);
    process.exit(1);
  }
};

importData();