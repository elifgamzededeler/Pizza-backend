const db = require("../../data/dbconfig");

async function create(payload) {
  const [id] = await db("rating").insert(payload, id);
  return id;
}

async function update(payload, id) {
  return db("rating").where("id", id).update(payload);
}

async function remove(id) {
  return db("rating").where("id", id).delete(payload);
}

module.exports = {
  create,
  remove,
  update,
};
