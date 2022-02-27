/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns("contacts", {
      created_at: {
        type: "TEXT",
        notNull: true,
      },
      updated_at: {
          type: "TEXT",
          notNull: true
      }
    });
};

exports.down = pgm => {};
