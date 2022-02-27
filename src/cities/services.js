const express = require('express');
const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class citiesServices{
    constructor(){
        this.pool = new Pool();
    }

    async addCities({name}){
        const citieId = `citie-${nanoid(15)}`;
        const query = {
            text: 'INSERT INTO cities VALUES ($1, $2) RETURNING id',
            values: [citieId, name]
        };
        const result = await this.pool.query(query);
        if(!result){
            throw new Error ('Gagal menambahkan City')
        }
        return result.rows;
    }

    async getCities(){
        const query = 'SELECT * FROM cities';
        const result = await this.pool.query(query);
        if (!result.rows.length) {
            throw new Error ('Data Kosong')
        }
        return result.rows;
    }

    async getCitiesById(id){
        const query = {
            text: 'SELECT * FROM cities WHERE id = $1',
            values: [id]
        }
        const result = await this.pool.query(query);
        if(!result.rows.length){
            throw new Error ('Id Salah')
        }
        return result.rows;
    }

    async putCites(id, {name}){
        const query = {
            text: 'UPDATE cities SET name = $1 WHERE id = $2',
            values: [name, id]
        }
        const result = await this.pool.query(query);
        if (!result.rowCount) {
            throw new Error ('Gagal update City, tidak ditemukan Id')
        }
        return result.rows;
    }

    async deleteCities(id){
        const query = {
            text: 'DELETE FROM cities WHERE id = $1',
            values: [id]
        }
        const result = await this.pool.query(query);
        if(!result){
            throw new Error (`Gagal menghapus City dengan id ${id}`)
        }
        return result.rows;
    }
}

module.exports = citiesServices;