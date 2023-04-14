/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex("rating").truncate();
  await knex("malzemeler").truncate();
  await knex("orders").truncate();
  await knex("pizzas").truncate();
  await knex("users").truncate();
  await knex("roles").truncate();

  await knex("roles").insert([
    { id: 1, role_name: "admin" },
    { id: 2, role_name: "user" },
  ]);

  await knex("malzemeler").insert([
    { id: 1, malzeme_name: "Pepperoni" },
    { id: 2, malzeme_name: "Sosis" },
    { id: 3, malzeme_name: "Kanada Jambonu" },
    { id: 4, malzeme_name: "Tavuk Izgara" },
    { id: 5, malzeme_name: "Soğan" },
    { id: 6, malzeme_name: "Domates" },
    { id: 7, malzeme_name: "Mısır" },
    { id: 8, malzeme_name: "Sucuk" },
    { id: 9, malzeme_name: "Zeytin" },
  ]);

  await knex("users").insert([
    {
      id: 1,
      name: "Gamze",
      surname: "Dedeler",
      email: "gamze@asdfg.com",
      password: "123456",
      role_id: 1,
    },
    {
      id: 2,
      name: "Mehmet",
      surname: "Dedeler",
      email: "mehmet@asdfg.com",
      password: "123456",
      role_id: 2,
    },
  ]);
  await knex("pizzas").insert([
    {
      id: 1,
      name: "Position Acı Pizza",
      desc: "acılı, biberli, domates zeytin var",
      price: 85.5,
    },
    {
      id: 2,
      name: "Position Akdeniz Pizza",
      desc: "kekik, beyaz peynirli, domates zeytin var",
      price: 65.5,
    },
  ]);
  await knex("orders").insert([
    {
      pizza_id: 1,
      hamur: "Kalın",
      price: 85.5,
      adet: 1,
      status: "Hazırlanıyor",
      boyut: "Büyük",
      user_id: 2,
      created_At: "2023-04-12 10:15:00",
      updated_at: "2023-04-12 10:15:00",
    },
  ]);
  await knex("rating").insert([
    {
      pizza_id: 1,
      user_id: 2,
      rate: 4,
    },
    {
      pizza_id: 1,
      user_id: 1,
      rate: 5,
    },
    {
      pizza_id: 2,
      user_id: 2,
      rate: 3,
    },
  ]);
};
