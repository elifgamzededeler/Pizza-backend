const db = require("../../data/dbconfig");

//pizza tablosu hiçbir şeye bağlı olmadığı için model functionlarda bağlama ve joinleme veya ekstra iş gerekmeyecek, foreign key olmayan tablolar daha kolay.

function getAll() {
  return db("pizzas as p").leftJoin("rating as r", "p.id", "r.pizza_id"); //pizzanın id si ile ratinglerin pizza_idsini joinledim.
  //collection array döner
}

function getById(id) {
  return db("pizzas as p")
    .leftJoin("rating as r", "p.id", "r.pizza_id") //yukarıdaki gibi joinledim.
    .where("p.id", id)
    .first(); //bu function id alsın, orders tablosunun "id" kolonundakilerden bizim gönderdiğimiz id ile match edenleri alsın ve bana ilkini dönsün.
  //bu bize obje döner
}

async function create(payload) {
  const [id] = await db("pizzas").insert(payload); //bu fonksyion bit payload alsın. orders tablosuna payload inputunu insert edelim. ve bunu dönelim.
  return getById(id);
  //new order id lerini dönüyor. eğer payloada array gönderirsem birden fazla şeyi insert edebilirim demektir.
  //new pizza ids
}

async function update(payload, id) {
  //TO DO: MALZEME UPDATE YAPACAĞIM
  return db("pizzas").where("id", id).update(payload); //gönderdiğimiz id liyi gönderdiğimiz payload ile update et
  //updated row count döner
}

async function remove(id) {
  return db("malzemeler").where("id", id).delete(); //delete reserved keyword
  //bu bana kaç tane rowun etkilendiğini döner // yani deleted row count döner
}

module.exports = {
  create,
  getById,
  getAll,
  remove,
  update,
};
