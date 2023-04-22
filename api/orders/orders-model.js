const db = require("../../data/dbconfig");

function getAll() {
  //bu tek satırlık kod malzemelerle beraber gelmiyor o yüzden join yapacağım.
  //return db("orders"); //bu bize bir collection döner yani array döner
  return db("orders as o")
    .leftJoin("order_malzemeler as om", "o.id", "om.order_id")
    .leftJoin("malzemeler as m", "om.malzeme_id", "m.id")
    .where("o.id", id);
}

function getById(id) {
  return db("orders as o")
    .leftJoin("order_malzemeler as om", "o.id", "om.order_id")
    .leftJoin("malzemeler as m", "om.malzeme_id", "m.id")
    .where("o.id", id)
    .first(); //bu function id alsın, orders tablosunun "id" kolonundakilerden bizim gönderdiğimiz id ile match edenleri alsın ve bana ilkini dönsün.
  //bu bize obje döner
}

async function create(payload) {
  //TO DO: MALZEME UPDATE YAPACAĞIM. Burada 2 tablo düzenleyeceğim için TRANSACTION A ihtiyacım var.
  let id;
  await db.transaction(async (trx) => {
    [id] = await db("orders").insert(payload); //bu fonksyion bit payload alsın. orders tablosuna payload inputunu insert edelim. ve bunu dönelim.
    if (payload.malzemeler && payload.malzemeler.length > 0) {
      const orderMalzemeleri = payload.malzemeler.map((malzemeId) => {
        const yeniMalzeme = {
          order_id: id,
          malzeme_id: malzemeId,
        };
        return yeniMalzeme;
      });
      await trx("orders_malzemeler").insert(orderMalzemeleri);
    }
  });
  return getById(id);
  //new order id lerini dönüyor. eğer payloada array gönderirsem birden fazla şeyi insert edebilirim demektir.
}

async function update(payload, id) {
  //TO DO: MALZEME UPDATE YAPACAĞIM. Burada 2 tablo düzenleyeceğim için TRANSACTION A ihtiyacım var.
  let count;
  await db.transaction(async (trx) => {
    //3 adım var
    //order_malzemeler sil
    await trx("orders_malzemeler").where("order_id", id).delete(); //orders_malzemeler tablosunda order_id'si benim gönderdiğim idyle match olanları sildim
    //order malzemelerini ekle
    if (payload.malzemeler && payload.malzemeler.length > 0) {
      //yani malzeme varsa array içerisinde malzeme idlerim var demektir.
      const orderMalzemeleri = payload.malzemeler.map((malzemeId) => {
        //her bir malzeme için function çalıştırıyorum
        const yeniMalzeme = {
          order_id: id,
          malzeme_id: malzemeId,
        };
        return yeniMalzeme;
      });
      await trx("orders_malzemeler").insert(orderMalzemeleri);
    }
    //orderı update et
    count = trx("orders").where("id", id).update(payload); //gönderdiğimiz id liyi gönderdiğimiz payload ile update et
    //updated row count döner
    //db yazmak yerine trx yazdık fonksiyona öyle geliyor
  });
  return count;
}

async function remove(id) {
  return db("orders").where("id", id).delete(); //delete reserved keyword
  //bu bana kaç tane rowun etkilendiğini döner // yani deleted row count döner
  //db cascade ederek orders_malzemeler tablosundan da silecek
}

module.exports = {
  create,
  getById,
  getAll,
  remove,
  update,
};
