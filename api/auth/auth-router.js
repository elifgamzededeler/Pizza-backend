const router = require("express").Router();
const User = require("../users/users-model");

router.post("/login", async (req, res) => {
  const registeredUser = await User.getByFilter({ email: req.body.email });
  if (registeredUser && registeredUser.password == req.body.password) {
    //if registeredUser varsa yani true ise VE passwordu, req.bodydeki passworde eşitse
    res.json({
      message: `merhaba ${registeredUser.name}, tekrar hoşgeldin...`,
    });
  } else {
    res.status(403).json({ message: "invalid creditendials" });
  }
  res.json("login");
});

router.post("/register", async (req, res) => {
  //bunu async function yaptık
  const payload = req.body; //requestin bodysinden payload aldık.
  const newUser = await User.create(payload); //await yaptık //user modelinin create functionınına payload gönderdik ve sonucu newUser olarak tanımladık
  res.json(newUser); //newUserı json responsı olarak dönüyorum
});

router.put("/password", (req, res) => {
  res.json("create password");
});
//idye gerek yok çünkü tokenla alabilirim, planlamada tokenla yaptım. logoutta da tokenı sileceğim, o yüzden logouta gerek kalmayacak

module.exports = router;
