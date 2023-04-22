const router = require("express").Router();
const User = require("../users/users-model");

router.post("/login", (req, res) => {
  res.json("login");
});

router.post("/register", async (req, res) => {
  const payload = req.body;
  const newUser = await User.create(payload);
  res.json(newUser);
});

router.put("/password", (req, res) => {
  res.json("create password");
});
//idye gerek yok çünkü tokenla alabilirim, planlamada tokenla yaptım. logoutta da tokenı sileceğim, o yüzden logouta gerek kalmayacak

module.exports = router;
