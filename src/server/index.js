import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import {
  getUser,
  getProducts,
  getProduct,
  getCartItems,
  getCartItem,
  addToCart,
  deleteCartItem
} from "./connectors";
const PORT = 8000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  morgan(function(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body, null, 2)
    ].join(" ");
  })
);

app.use(function(req, res, next) {
  setTimeout(next, 500);
});

app.get("/api/user", function(req, res) {
  res.json(getUser());
});

app.get("/api/products", function(req, res) {
  res.json(getProducts());
});

app.get("/api/products/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  res.json(getProduct(id));
});

app.get("/api/cart-items", function(req, res) {
  res.json(getCartItems());
});

app.get("/api/cart-items/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  res.json(getCartItem(id));
});

app.post("/api/cart-items", function(req, res) {
  res.json(addToCart(req.body));
});

app.post("/api/cart-items/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  res.json(deleteCartItem({ id }));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
