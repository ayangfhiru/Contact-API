const express = require("express");
const route = express.Router();
const bloodervices = require('./services');

route.post('/blood', async(req, res)=>{
    const name = req.body;
    const blood = await new bloodervices().addBloods(name);
    res.json({
        status: 'Success',
        bloods: blood
    });
});

route.get('/blood', async(req, res)=>{
    const blood = await new bloodervices().getBloods();
    res.json({
        status: 'Success',
        bloods: blood
    });
});

route.get('/blood/:id', async(req, res)=>{
    const bloodsId = req.params.id;
    const blood = await new bloodervices().getBloodsById(bloodsId);
    res.json({
        status: 'Success',
        bloods: blood
    });
});

route.delete('/blood/:id', async(req)=>{
    const bloodsId = req.params.id;
    const bloods = await new bloodervices().deleteBloods(bloodsId);
})

module.exports = route;