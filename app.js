const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const InventoryRoutesRoutes = require("./Inventory/Inventory.routes");
const ProductRoutesRoutes = require("./Product/Product.routes");
const AddtocardRoutesRoutes = require("./AddToCard/AddToCard.routes");
const OrderRoutesRoutes = require("./Order/order.routes");


const db = require("./DB/connection");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/inventory", InventoryRoutesRoutes);
app.use("/product", ProductRoutesRoutes);
app.use("/addtocard", AddtocardRoutesRoutes);
app.use("/orders", OrderRoutesRoutes);

// auth
// auth only
app.use("/auth", require("./auth/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
