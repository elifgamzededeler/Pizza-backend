const router = require("express").Router();

router.get("/login", (req, res) => {
  res.json("login");
});

router.get("/register", (req, res) => {
  res.json("register");
});

router.put("/password", (req, res) => {
  res.json("create password");
});
//idye gerek yok çünkü tokenla alabilirim, planlamada tokenla yaptım. logoutta da tokenı sileceğim, o yüzden logouta gerek kalmayacak

module.exports = router;
