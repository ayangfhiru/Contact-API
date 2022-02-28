const express = require('express');
const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class contactsServices{
    constructor(){
        this.pool = new Pool();
    }

    async addContact({name, address, year, gender, blood, ph_number, city}){
        const contactId = `contact-${nanoid(13)}`;
        const created_at =  new Date().toISOString();
        const updated_at = created_at;
        const query = {
            text: 'INSERT INTO contacts VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
            values: [contactId, name, address, year, gender, blood, ph_number, city, created_at, updated_at]
        }
        const result = await this.pool.query(query);
        if(!result){
            throw new Error ('Gagal menambahkan Contact');
        }
        return result.rows;
    }

    async getContact(){
        const query = 'SELECT id, name, address FROM contacts';
        const result = await this.pool.query(query);
        if(!result){
            throw new Error ('Data contact kosong');
        }
        return result.rows;
    }

    async getContactById(id){
        const query = {
            text: `SELECT contacts.*, bloods.name AS blood, cities.name AS city 
            FROM contacts JOIN bloods ON contacts.blood = bloods.id 
            JOIN cities ON contacts.city = cities.id
            WHERE contacts.id = $1`,
            values: [id]
        }
        const result = await this.pool.query(query)
        if(!result.rows){
            throw new Error ('Id contact salah')
        }
        return result.rows;
    }

    async putContact(id, {name, address, ph_number}){
        const query = {
            text: 'UPDATE contacts SET name = $1, address = $2, ph_number = $3 WHERE id = $4',
            values: [name, address, ph_number, id]
        }
        const result = await this.pool.query(query);
        if(!result.rows){
            throw new Error("Gagal update Contact, tidak ditemukan Id");
        }
        return result.rows;
    }

    async deleteContact(id){
        const query = {
            text: 'DELETE FROM contacts WHERE id = $1',
            values: [id]
        }
        const result = await this.pool.query(query);
        if(!result.rows){
            throw new Error (`Gagal menghapus Contact dengan Id ${id}`);
        }
        return result.rows;
    }
}

module.exports = contactsServices;