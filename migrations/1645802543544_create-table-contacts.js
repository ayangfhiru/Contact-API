/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("contacts", {
      id: {
        type: "VARCHAR(35)",
        primaryKey: true,
      },
      name: {
        type: "TEXT",
        notNull: true,
      },
      address: {
        type: "TEXT",
        notNull: true,
      },
      year: {
        type: "INTEGER",
        notNull: true,
      },
      gender: {
        type: "TEXT",
        notNull: true,
      },
      blood: {
        type: "VARCHAR(35)",
      },
      ph_number: {
        type: "TEXT",
        notNull: true,
      },
      city: {
        type: "VARCHAR(35)",
      },
    });
};

exports.down = pgm => {
  pgm.dropTable('contacts');
};
