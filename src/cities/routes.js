const express = require('express');
const route = express.Router();
const citieServices = require('./services');
const validateCitie = require('../validation/cities');

route.post('/city', async(req, res)=>{
    try {
        await validateCitie.validateAsync(req.body);
        const citie = await new citieServices().addCities(req.body);
        res.json({
          status: "Success",
          City: citie,
        });
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
});

route.get('/city', async(req, res)=>{
    try {
        const citie = await new citieServices().getCities();
        res.json({
          status: "Success",
          city: citie,
        });
    } catch (error) {
        res.json({
            status: 'Success',
            message: error.message
        });
    }
});

route.get('/city/:id', async(req, res)=>{
    try {
        const citieId = req.params.id;
        const citie = await new citieServices().getCitiesById(citieId);
        const contact = await new citieServices().getBloodAndContactByIdCitie(citieId)

        const maping = {
            id: citie.id,
            name: citie.name,
            countPeople: contact.rowCount,
            contacts: contact.rows.map(element => ({
                id: element.id,
                name: element.name,
                address: element.address
            }))
        }

        res.json({
          status: "Success",
          city: maping,
        });        
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
});

route.put('/city/:id', async(req, res)=>{
    try {
        const citieId = req.params.id;
        await validateCitie.validateAsync(req.body);
        const citie = await new citieServices().putCites(citieId, req.body);
        res.json({
          stauts: "Success",
          message: `Berhasil mengedit City dengan Id ${citieId}`,
        });
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

route.delete('/city/:id', async(req, res)=>{
    try {
        const citieId = req.params.id;
        const citie = await new citieServices().deleteCities(citieId);
        res.json({
          status: "Success",
          message: `Berhasil mengapus City dengan Id ${citieId}`,
        });
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

module.exports = route;