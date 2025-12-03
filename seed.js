const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
const Menu = require("./models/Menu");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const seedRestaurants = [
  {
    name: "Pizza Paradise",
    image: "https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg",
    rating: 4.5,
    deliveryTime: 30,
    category: "Food Delivery"
  },
  {
    name: "Grocery Express",
    image: "https://hopkinsdiabetesinfo.org/wp-content/uploads/2022/02/Food-Grocery-Vegetables-1140771380.jpg",
    rating: 4.2,
    deliveryTime: 25,
    category: "Instamart"
  },
  {
    name: "Fine Dine Bistro",
    image: "https://tse1.mm.bing.net/th/id/OIP.ybY6XMZRTqoCNiUSjOx3pgHaFS?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.7,
    deliveryTime: 40,
    category: "Dineout"
  }
];

const seedMenu = [
  {
    restaurantId: "", // will assign after restaurants created
    name: "Margherita Pizza",
    price: 8,
    image: "https://foodbyjonister.com/wp-content/uploads/2020/01/MargheritaPizza.jpg",
    veg: true,
    description: "Classic margherita pizza with fresh mozzarella"
  },
  {
    restaurantId: "",
    name: "Pepperoni Pizza",
    price: 10,
    image: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/2004-easy-pepperoni-pizza?wid=1300&hei=1300",
    veg: false,
    description: "Pepperoni with mozzarella and tomato sauce"
  },
  {
    restaurantId: "",
    name: "Organic Apples",
    price: 3,
    image: "https://tse2.mm.bing.net/th/id/OIP.zIg62fA7FeHzuFMm5cx00AHaFQ?rs=1&pid=ImgDetMain&o=7&rm=3",
    veg: true,
    description: "Fresh organic apples"
  },
  {
    restaurantId: "",
    name: "Bananas",
    price: 2,
    image: "https://tse2.mm.bing.net/th/id/OIP.OURg9KhhFO6jon7nj6X_owHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    veg: true,
    description: "Ripe yellow bananas"
  },
  {
    restaurantId: "",
    name: "Grilled Steak",
    price: 15,
    image: "https://tse3.mm.bing.net/th/id/OIP.gj5NINTddjItOmNV-yiXLwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    veg: false,
    description: "Premium grilled steak with sides"
  }
];

const seedDB = async () => {
  await Restaurant.deleteMany({});
  await Menu.deleteMany({});

  const restaurants = await Restaurant.insertMany(seedRestaurants);

  // Assign restaurantId in menu
  const menuWithIds = seedMenu.map((item, idx) => {
    if (idx < 2) item.restaurantId = restaurants[0]._id;
    else if (idx < 4) item.restaurantId = restaurants[1]._id;
    else item.restaurantId = restaurants[2]._id;
    return item;
  });

  await Menu.insertMany(menuWithIds);

  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();
