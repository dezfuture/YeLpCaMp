// The main reason we make this index file is because it's gonna connect to mongoose and also use our model ALSO anytime you wanna seed the database just run -> 'node seeds/index.js'.

const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yellycampo", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60d7091e9e96ff539c979bca",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // ye 1600x900 hta bhi skte ho, here we have used the unsplash API
      // image: "http://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      price,
      geometry: { type: "Point", coordinates: [80.33111, 26.4725] },
      images: [
        {
          url: "https://res.cloudinary.com/dokje7ogf/image/upload/v1624959705/YeLpCaMp/r5ecbr0dhbxw1p2fnedy.jpg",
          filename: "YeLpCaMp/r5ecbr0dhbxw1p2fnedy",
        },
        {
          url: "https://res.cloudinary.com/dokje7ogf/image/upload/v1624959706/YeLpCaMp/dyphhdhkvxh9cxlwpbrf.jpg",
          filename: "YeLpCaMp/dyphhdhkvxh9cxlwpbrf",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
