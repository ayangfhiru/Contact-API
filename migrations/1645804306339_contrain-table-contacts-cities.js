/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addContrain(
      "contacts",
      "fk_contacts.cities_id_cities.id",
      "FOREGIN KEY(city) REFERENCES cities(id) ON DELETE CASCADE"
    );
};

exports.down = pgm => {
  pgm.dropContrain("contacts", "fk_contacts.cities_id_cities.id");
};
