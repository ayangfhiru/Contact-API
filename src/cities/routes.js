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
          cities: citie,
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
          cities: citie,
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
        res.json({
          status: "Success",
          cities: citie,
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
          cities: `Berhasil mengedit City dengan Id ${citieId}`,
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