const bcrypt = require("bcryptjs");
const { HASH_ROUND } = require("../../config/config");

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const checkPayload = (req, res, next) => {
  try {
    if (!req.body.name || !req.body.name.trim() || req.body.name.length <= 3) {
      next({
        status: 400,
        message: "Name bilgisi yok veya en az 3 karakter olmalı",
      });
    } else if (
      !req.body.surname ||
      !req.body.surname.trim() ||
      req.body.surname.length <= 3
    ) {
      next({
        status: 400,
        message: "SurName bilgisi yok veya en az 3 karakter olmalı",
      });
    } else if (
      !req.body.password ||
      !req.body.password.trim() ||
      req.body.password.length <= 3
    ) {
      next({
        status: 400,
        message: "Password bilgisi yok veya en az 3 karakter olmalı",
      });
    } else if (
      !req.body.email ||
      !req.body.email.trim() ||
      !validateEmail(req.body.email)
    ) {
      next({
        status: 400,
        message: "email bilgisi yok veya email valide değil",
      });
    }
    if (!req.body.role_id) {
      //eğer role id gelmemişse, role id'ye 2 atalım
      req.body.role_id = 2;
    }
    next();
  } catch (err) {
    next({ status: 500, message: "Payload error" });
  }
};

const hashPassword = (req, res, next) => {
  try {
    const password = req.body.password;
    const hashPassword = bcrypt.hashSync(password, HASH_ROUND);
    req.body.password = hashPassword;
    next(); //next demeyi unutursan istek askıda kalır. döner durur
  } catch (err) {
    next({ status: 500, message: "Password hashing error" });
  }
};

const checkPassword = (req, res, next) => {
  try {
    const password = req.body.password;
    if (bcrypt.compareSync(password, req.user.password)) {
      next();
    } else {
      next({ status: 400, message: "invalid creditentials" });
    }

    const hashPassword = bcrypt.hashSync(password, HASH_ROUND);
    req.body.password = hashPassword;
    next(); //next demeyi unutursan istek askıda kalır. döner durur
  } catch (err) {
    next({ status: 500, message: "Password hashing error" });
  }
};

const checkLoginPayload = (req, res, next) => {
  try {
    if (
      !req.body.password ||
      !req.body.password.trim() ||
      req.body.password.length <= 4
    ) {
      next({
        status: 400,
        message: "Password bilgisi yok veya en az 4 karakter olmalı",
      });
    } else if (
      !req.body.email ||
      !req.body.email.trim() ||
      !validateEmail(req.body.email)
    ) {
      next({
        status: 400,
        message: "email bilgisi yok veya email valide değil",
      });
    }
    next();
  } catch (err) {
    next({ status: 500, message: "Payload error" });
  }
};

module.exports = {
  hashPassword,
  checkPayload,
  checkLoginPayload,
  checkPassword,
};
