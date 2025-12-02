const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 2525;

app.use(express.json());
app.use(cors());

// Connect to foodwebsite database
const mongoURL = `mongodb://localhost:27017/foodwebsite`;

mongoose.connect(mongoURL)
  .then(() => console.log('Mongoose connected to foodwebsite'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// Define restaurant schema - update fields as per your data
const restaurantSchema = new Schema({
  foodId: String,
  category: String,
  owner: {
    ownerId: String,
    name: String,
    contact: String
  },
  name: String,
  contact: String,
  image: String,
  items: [
    {
      itemId: String,
      itemName: String,
      price: Number,
      description: String,
      image: String,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema, "restaurants");

// Get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
