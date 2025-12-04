// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");

// // extra add
// const restaurantRoutes = require("./routes/restaurantRoutes");
// const menuRoutes = require("./routes/menuRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// // extra add
// app.use("/api/restaurants", restaurantRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);



// // Connect DB
// app.listen(process.env.PORT || 5000, () =>
//   console.log(`Server running on port ${process.env.PORT || 5000}`)
// );


// -------
// const dotenv = require("dotenv");
// dotenv.config(); // Load .env first

// const connectDB = require("./config/db");
// connectDB();

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const restaurantRoutes = require("./routes/restaurantRoutes");
// const menuRoutes = require("./routes/menuRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/restaurants", restaurantRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);

// // Root route
// app.get("/", (req, res) => res.send("API is running"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// ------------




const dotenv = require("dotenv");
dotenv.config(); // Load .env first

const connectDB = require("./config/db");
connectDB();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// ✅ Important middlewares
app.use(cors({
  origin: "*",      // allow all for now (can restrict later)
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json({ limit: "10mb" }));  // ⭐ Fixes req.body undefined
app.use(express.urlencoded({ extended: true })); // ⭐ Fixes FormData issues

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Root route
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
