const router = require("express").Router(); //expressten routeri import ettim
const Orders = require("./orders-model"); //model function olduğu için büyük harfle başladım. buradan orders-modeli import ettim

router.get("/", async (req, res) => {
  const orders = await Orders.getAll();
  res.json(orders);
  //routera şimdilik get request atıp string dönüp kontrol ediyoruz.
  //res.json("get all orders");
});

router.get("/:id", (req, res) => {
  res.json("get order by id");
});

router.post("/", async (req, res) => {
  const newOrder = {
    pizza_id: 1,
    hamur: "Kalın",
    price: 85.5,
    adet: 1,
    status: "Hazırlanıyor",
    boyut: "Büyük",
    user_id: 2,
    created_At: "2023-04-12 10:15:00",
    updated_at: "2023-04-12 10:15:00",
  };
  const order = await Orders.create(newOrder); //orders modelinin içinde create function oluşturdum, burada onu kullanıyorum.
  res.json(order);
});

router.put("/:id", (req, res) => {
  res.json("update order");
});

router.delete("/:id", (req, res) => {
  res.json("delete order");
});

module.exports = router;
