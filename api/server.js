const express = require("express");

const server = express();

const userRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const orderRouter = require("./orders/orders-router");
const malzemelerRouter = require("./malzemeler/malzemeler-router");
const pizzasRouter = require("./pizzas/pizzas-router");
const ratingRouter = require("./rating/rating-router");

server.use("./api/auth", authRouter);
server.use("./api/user", userRouter);
server.use("api/order", orderRouter);
server.use("api/malzemeler", malzemelerRouter);
server.use("api/pizzas", pizzasRouter);
server.use("api/rating", ratingRouter);

module.exports = server;
