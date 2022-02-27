/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addContrain(
      "contacts",
      "fk_contacts.bloods_id_bloods.id",
      "FOREGIN KEY(blood) REFERENCES bloods(id) ON DELETE CASCADE"
    )
};

exports.down = pgm => {
  pgm.dropContrain("contacts", "fk_contacts.bloods_id_bloods.id");
};
