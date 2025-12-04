const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();  
const port = 2525;

app.use(express.json());
app.use(cors());

const mongoURL = "mongodb+srv://username:password@cluster0.w9wxj.mongodb.net/foodwebsite?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL)
  .then(() => console.log("Mongoose connected to foodwebsite"))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  data: {
    type: Schema.Types.Mixed,
  },
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.status(200).json(restaurants);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
