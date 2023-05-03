const router = require("express").Router(); //expressten routeri import ettim
const Orders = require("./orders-model"); //model function olduğu için büyük harfle başladım. buradan orders-modeli import ettim

router.get("/", async (req, res) => {
  const orders = await Orders.getAll();
  res.json(orders);
  //routera şimdilik get request atıp string dönüp kontrol ediyoruz.
  //res.json("get all orders");
});

router.get("/:id", async (req, res) => {
  const order = await Orders.getById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res
      .status(400)
      .json({ message: `${req.params.id}'li sipariş bulunamadı...` });
  }
});

router.post("/", async (req, res) => {
  const payload = req.body; //payloadı req.bodysinden aldım
  payload.status = "Sipariş hazırlanıyor"; //payloada status ekledim.
  payload.user_id = 2; //payloada user_id ekledim
  const order = await Orders.create(payload); //orders modelinin içinde create function oluşturdum, burada onu kullanıyorum.
  res.status(201).json(order);
});

router.post("/:id", async (req, res) => {
  const payload = req.body;
  payload.status = "Sipariş hazırlanıyor";
  payload.user_id = 2;
  const count = await Orders.update(payload, req.params.id);
  res.status(201).json({ message: `${req.params.id} id'li order güncellendi` });
});

router.delete("/:id", async (req, res) => {
  const count = await Orders.remove(req.params.id);
  res.json({ message: `${count} order silindi` });
  res.json("delete order");
});

module.exports = router;
