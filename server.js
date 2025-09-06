const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

// Dummy product data (later you can connect DB)
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 70000,
    imagePath: "laptops.jpeg",
    category: "computers"
  },
  {
    id: 2,
    name: "Mobile Phone",
    price: 30000,
    imagePath: "mobiles.jpeg",
    category: "mobiles"
  },
  {
    id: 3,
    name: "Computer",
    price: 50000,
    imagePath: "computers.jpeg",
    category: "computers"
  },
  {
    id: 4,
    name: "Headphones",
    price: 2000,
    imagePath: "accessories.jpeg",
    category: "accessories"
  }
];

// Serve static images from public/images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// API route to get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// API route to get products by category
app.get("/api/products/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const filtered = products.filter(
    (p) => p.category.toLowerCase() === category
  );
  res.json(filtered);
});

// Example test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});