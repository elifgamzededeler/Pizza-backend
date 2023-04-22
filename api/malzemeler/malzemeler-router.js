const router = require("express").Router();
const Malzeme = require("./malzemeler-model");

router.get("/", async (req, res) => {
  const malzemeler = await Malzeme.getAll();
  res.json(malzemeler);
});

router.get("/:id", async (req, res) => {
  const malzeme = await Malzeme.getById(req.params.id);
  if (malzeme) {
    res.json(malzeme);
  } else {
    res
      .status(400)
      .json({ message: `${req.params.id} id'li malzeme bulunamadı...` });
  }
});

router.post("/", async (req, res) => {
  const malzeme = await Malzeme.create(req.body);
  res.status(201).json(malzeme);
});

router.put("/:id", async (req, res) => {
  //malzemenin idsini endpointe alıyor. güncellemek istediğim malzemenin idsini endpointte yazıyorum, yeni malzeme_name gönderiyorum. o idyi yeni name ile güncelliyor.
  const count = await Malzeme.update(req.body, req.params.id); //update fonksiyonu hem payload hem id alıyor.
  res.json({ message: `${count} malzeme güncellendi` });
  //bu fonksiyon count dönüyor o yüzden adını count yaptım
});

router.delete("/:id", async (req, res) => {
  const count = await Malzeme.remove(req.params.id);
  res.json({ message: `${count}malzeme silindi` });
  //bu fonksiyon da count dönüyor.
});

module.exports = router;
