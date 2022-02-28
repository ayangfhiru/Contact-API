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
        if(!result){
            throw new Error ('Gagal menambahkan Blood')
        }
        return result.rows;
    }

    async getBloods(){
        const query = 'SELECT * FROM bloods';
        const result = await this.pool.query(query);
        if(!result){
            throw new Error ('Gagal menampilakan Bloods')
        }
        return result.rows;
    }

    async getBloodsById(id){
        const query = {
          text: `SELECT * FROM bloods WHERE id = $1`,
          values: [id]
        };
        const result = await this.pool.query(query);
        if(!result.rows[0]){
            throw new Error (`Gagal menampilkan Blood dengan Id ${id}`)
        }
        return result.rows[0];
    }

    async getCitieAndContactByIdBlood(id){
        const query = {
          text: `SELECT C.id, C.name, I.name AS city FROM bloods B JOIN contacts C ON B.id = C.blood 
          JOIN cities I ON C.city = I.id WHERE B.id = $1`,
          values: [id]
        };
        const result = await this.pool.query(query);
        if(!result){
            throw new Error (`Gagal menampilkan data dengan Id Blood ${id}`)
        }
        return result;
    }

    // async deleteBloods(id){
    //     const query = {
    //         text: 'DELETE FROM bloods WHERE id = $1',
    //         values: [id]
    //     }
    //     const result = await this.pool.query(query)
    // }
}

module.exports = bloodsServices;