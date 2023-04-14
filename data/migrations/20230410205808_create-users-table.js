/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("role_name", 32).notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("name", 64).notNullable();
      tbl.string("surname", 64).notNullable();
      tbl.string("email", 128).notNullable();
      tbl.string("password", 128).notNullable();
      tbl
        .integer("role_id")
        .defaultTo(2) //eğer set etmemişsek defaultı 2 olsun. 1e admin, 2ye normal user diyeceğim
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("roles");
    })
    .createTable("pizzas", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.text("desc").notNullable();
      tbl.decimal("price").notNullable().unsigned(); //negatif değer olamaz
    })
    .createTable("rating", (tbl) => {
      tbl.integer("rate").notNullable().unsigned();
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users") //users tablosundaki idye eşleşsin benim buradaki likeların içindeki user_id 'im
        .onDelete("NO ACTION")
        .onUpdate("NO ACTION");
      tbl
        .integer("pizza_id")
        .notNullable() //BU KISIM BOŞ BIRAKILAMAZ
        .unsigned() //NEGATİF DEĞER OLAMAZ
        .references("id")
        .inTable("users") //users tablosundaki idye eşleşsin benim buradaki likeların içindeki user_id 'im
        .onDelete("CASCADE") //pizza gittiği zaman bu likeın hiçbir önemi yok, like da gitsin.
        .onUpdate("CASCADE"); //bu yüzden cascade dedim.
      tbl.primary(["user_id", "pizza_id"]); //user_id ve pizza_id kombinasyonundan oluşan bir primary key oluşturdum. tek başına user_id veya pizza_id unique olamaz. ama bir kullanıcının o pizzadaki like'ı uniquedir. 2 kere aynı pizzayı likelayamaz.
    })
    .createTable("malzemeler", (tbl) => {
      tbl.increments();
      tbl.string("malzeme_name", 64).notNullable();
    })
    .createTable("orders", (tbl) => {
      tbl.increments();
      tbl.string("hamur", 32).notNullable();
      tbl.string("boyut", 32).notNullable();
      tbl.integer("adet").notNullable().unsigned();
      tbl.text("not");
      tbl.string("status", 32).defaultTo("sıraya alındı").notNullable();
      tbl.decimal("price").notNullable().unsigned();
      tbl
        .integer("pizza_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("pizzas")
        .onDelete("NO ACTION") //pizza silinince orderın silinmesini istemem, o yüzden cascade kullanmayacağım. orderı silmeden pizzayı silmem gerekebilir mi? pizzayı yayından kaldırabilirim evet. burayı no action yapabilirim.
        .onUpdate("NO ACTION");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.timestamps(knex.fn.now()); //created at ve updated at otomatik olarak yapacak çünkü timestampS dedim. (çoğul) eğer tekil timestamp deseydim, içine yazmam gerekirdi.
    })
    .createTable("orders_malzemeler", (tbl) => {
      tbl
        .integer("order_id")
        .notNullable()
        .references("id")
        .inTable("orders")
        .onDelete("CASCADE") //order gittiğinde orders_malzemeler de temizlensin. bu yüzden cascade dedim. eğer bunu yazmazsam model functionda remove yaparken kendim yazmam gerekir
        .onUpdate("CASCADE");
      tbl
        .integer("malzeme_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("malzemeler");
      tbl.primary(["order_id", "malzeme_id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return (
    knex.schema
      .dropTableIfExists("orders_malzemeler") //sondan başa doğru export yapıyorum
      //orders_malzemeler tablosunu orders tablosu üzerinden edit edeceğim. bu yüzden orders_malzemelere model function yazmıyorum
      .dropTableIfExists("orders")
      .dropTableIfExists("malzemeler")
      .dropTableIfExists("rating")
      .dropTableIfExists("pizzas")
      .dropTableIfExists("users")
      .dropTableIfExists("roles")
  );
};
//bu sayfadaki kodlarım bitince npm run migrate yapıyorum (o da knex migrate:latest yapıyor, package json dosyasında açılımını yazmıştık)
