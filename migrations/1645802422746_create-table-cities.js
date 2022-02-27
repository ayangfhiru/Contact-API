/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('cities', {
        id: {
            type: "VARCHAR(35)",
            primaryKey: true
        },
        name: {
            type: "TEXT",
            notNull: true
        }
    })
};

exports.down = pgm => {
    pgm.dropTable("cities");
};
