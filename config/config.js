const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || "development";
const HASH_ROUND = 10;
const JWT_SECRET = process.env.JWT_SECRET || "HELLO MELLO";

module.exports = { PORT, NODE_ENV, HASH_ROUND, JWT_SECRET };
