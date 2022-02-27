const express = require("express");
const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class bloodsServices{
    constructor(){
        this.pool = new Pool();
    }

    async addBloods({name}){
        const bloodId = `blood-${nanoid(15)}`;
        const query = {
            text: 'INSERT INTO bloods VALUES ($1, $2) RETURNING id',
            values: [bloodId, name]
        };
        const result = await this.pool.query(query);
        return result.rows;
    }

    async getBloods(){
        const query = 'SELECT * FROM bloods';
        const result = await this.pool.query(query);
        return result.rows;
    }

    async getBloodsById(id){
        const query = {
            text: `SELECT C.id, C.name, C.city AS I.name FROM bloods B 
            JOIN contacts C ON C.blood = B.id JOIN cities I ON C.city = I.id
            WHERE B.id = $1`,
            values: [id]
        }
        const result = await this.pool.query(query);
        return result.rows;
    }

    async deleteBloods(id){
        const query = {
            text: 'DELETE FROM bloods WHERE id = $1',
            values: [id]
        }
        const result = await this.pool.query(query)
    }
}

module.exports = bloodsServices;