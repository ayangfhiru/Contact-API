const express = require('express');
const route = express.Router();
const validateContact = require('../validation/contacts');
const contactServices = require('./services');

route.post('/contact', async(req, res)=>{
    try {
        await validateContact.validateAsync(req.body);
        const contact = await new contactServices().addContact(req.body);
        res.json({
            status: 'Success',
            contacts: contact
        })
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

route.get('/contact', async(req, res)=>{
    try {
        const contact = await new contactServices().getContact();
        res.json({
            status: 'Success',
            contacts: contact
        })
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

route.get('/contact/:id', async(req, res)=>{
    try {
        const contactId = req.params.id;
        const contact = await new contactServices().getContactById(contactId);
        res.json({
            status: 'Success',
            contacts: contact
        }) 
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

route.put('/contact/:id', async(req, res)=>{
    try {
        const contactId = req.params.id;
        await validateContact.validateAsync(req.body);
        const contact = await new contactServices().putContact(contactId, req.body);
        res.json({
            status: 'Success',
            contacts: contact
        })
    } catch (error) {
        res.json({
            status: 'Fail',
            contact: error.message
        })
    }
})

route.delete('/contact/:id', async(req, res)=>{
    try {
        const contactId = req.params.id;
        const contact = await new contactServices().deleteContact(contactId);
        res.json({
            status: 'Success',
            contacts: `Berhasil menghapus Kontak dengan Id ${contactId}`
        })
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

module.exports = route;