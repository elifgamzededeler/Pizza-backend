const router = require("express").Router();
const User = require("../users/users-model");
const authMid = require("./auth-middleware");
const userMid = require("../users/users-middleware");
const jwt = require("jsonwebtoken"); //jsonwebtoken import ettik aşağıda kullanacağız
const { JWT_SECRET } = require("../../config/config"); //jwt secretı config ayarlarımdan çekeceğim

router.post(
  "/login",
  authMid.checkLoginPayload,
  userMid.checkUser,
  authMid.checkPassword,
  async (req, res) => {
    const token = generateToken(req.user);
    res.json({ message: `Merhaba ${req.user.name}, tekrar hoşgeldin`, token });
  }
);

//yukarıda araya middleware ekledim
//şimdi jsonwebtoken kullanarak token oluşturacağım
/*const registeredUser = await User.getByFilter({ email: req.body.email });
    if (registeredUser && registeredUser.password == req.body.password) {
      //if registeredUser varsa yani true ise VE passwordu, req.bodydeki passworde eşitse
      res.json({
        message: `merhaba ${registeredUser.name}, tekrar hoşgeldin...`,
      });
    } else {
      res.status(403).json({ message: "invalid creditendials" });
    }
    res.json("login");
  }
); */

router.post(
  "/register",
  authMid.checkPayload,
  authMid.hashPassword,
  async (req, res) => {
    //eğer middleware checkpayloaddan geçerse, hashpasswordden geçsin.
    //bunu async function yaptık
    const payload = req.body; //requestin bodysinden payload aldık.

    const newUser = await User.create(payload); //await yaptık //user modelinin create functionınına payload gönderdik ve sonucu newUser olarak tanımladık
    res.json(newUser); //newUserı json responsı olarak dönüyorum
  }
);

router.put("/password", (req, res) => {
  res.json("create password");
});
//idye gerek yok çünkü tokenla alabilirim, planlamada tokenla yaptım. logoutta da tokenı sileceğim, o yüzden logouta gerek kalmayacak

//token oluşturup token dönüyor.
function generateToken(user) {
  //payload ve options oluşturdum. JWT_SECRET da config/env den çekiyorum.bu bilgilerle const token ile token oluşturuyorum, daha sonra return token yapıyorum.
  const payload = {
    user_id: user.id,
    role: user.role_name,
  };
  const options = {
    expiresIn: "8h",
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

module.exports = router;
