const express = require("express");

const server = express();

const userRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const orderRouter = require("./orders/orders-router");
const malzemelerRouter = require("./malzemeler/malzemeler-router");
const pizzasRouter = require("./pizzas/pizzas-router");
const ratingRouter = require("./rating/rating-router");

server.use(express.json()); //requesti jsona dönüştürür. bu olmazsa req.body yaptığımızda bodydeki jsonı okuyamayız.
server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);
server.use("/api/order", orderRouter);
server.use("/api/malzemeler", malzemelerRouter);
server.use("/api/pizzas", pizzasRouter);
server.use("/api/rating", ratingRouter);

//error middleware
server.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
    stack: err.stack || "No details added",
  });
});

module.exports = server;
