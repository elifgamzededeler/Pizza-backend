const db = require("../../data/dbconfig");

function getAll() {
  return db("users as u") //bu bize bir collection döner yani array döner
    .join("roles as r", "u.role_id", "r.id") //users tablosuna roles tablosunu birleştirdim. users'tan role id ile roles'dan id match olarak joinledim.
    .select("u.id", "u.name", "u.surname", "u.email", "r.role_name"); //joinlenen tablonun bütün kolonlarını vermesine gerek yok istediğim kolonları select ediyorum.
}

function getById(id) {
  return (
    db("users as u") //bu bize bir collection döner yani array döner
      .join("roles as r", "u.role_id", "r.id") //users tablosuna roles tablosunu birleştirdim. users'tan role id ile roles'dan id match olarak joinledim.
      .select("u.id", "u.name", "u.surname", "u.email", "r.role_name")
      //buraya kadar yukarıdaki functionın aynısı
      .where("u.id", id) //users tablosundan id, bizim gönderdiğimiz id ile match ise
      .first() //ilkini bana getir
  );
}

function getByFilter(filter) {
  return db("users as u") //bu bize bir collection döner yani array döner
    .join("roles as r", "u.role_id", "r.id") //users tablosuna roles tablosunu birleştirdim. users'tan role id ile roles'dan id match olarak joinledim.
    .where(filter) //filter olanları where yap, bul
    .first(); //ilkini bana getir
}

async function create(payload) {
  const [id] = await db("users").insert(payload); //bu fonksyion bit payload alsın. orders tablosuna payload inputunu insert edelim. ve bunu dönelim.
  return getById(id);
  //new order id lerini dönüyor. eğer payloada array gönderirsem birden fazla şeyi insert edebilirim demektir.
  //new malzeme ids
}

async function update(payload, id) {
  //TO DO: MALZEME UPDATE YAPACAĞIM
  return db("users").where("id", id).update(payload); //gönderdiğimiz id liyi gönderdiğimiz payload ile update et
  //updated row count döner
}

async function remove(id) {
  return db("users").where("id", id).delete(); //delete reserved keyword
  //bu bana kaç tane rowun etkilendiğini döner // yani deleted row count döner
}

module.exports = {
  create,
  getById,
  getByFilter,
  getAll,
  remove,
  update,
};
