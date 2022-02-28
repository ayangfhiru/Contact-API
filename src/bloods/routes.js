const express = require("express");
const route = express.Router();
const bloodervices = require('./services');

route.post('/blood', async(req, res)=>{
    try {
        const name = req.body;
        const blood = await new bloodervices().addBloods(name);
        res.json({
          status: "Success",
          Bloods: blood,
        });
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })   
    }
});

route.get('/blood', async(req, res)=>{
    try {
        const blood = await new bloodervices().getBloods();
        res.json({
          status: "Success",
          Bloods: blood,
        });
    } catch (error) {
        res.json({
          status: "Fail",
          message: error.message,
        }); 
    }
});

route.get('/blood/:id', async(req, res)=>{
    try {
        const bloodsId = req.params.id;
        const blood = await new bloodervices().getBloodsById(bloodsId);
        const contact = await new bloodervices().getCitieAndContactByIdBlood(
          bloodsId
        );

        const data = {
          id: blood.id,
          name: blood.name,
          countNotes: contact.rowCount,
          contacts: contact.rows.map((element) => ({
            id: element.id,
            title: element.name,
            body: element.city,
          })),
        };

        res.json({
          status: "Success",
          Blood: data,
        });
    } catch (error) {
        res.json({
          status: "Fail",
          message: error.message,
        });
    }
});

// route.delete('/blood/:id', async(req)=>{
//     const bloodsId = req.params.id;
//     const bloods = await new bloodervices().deleteBloods(bloodsId);
// })

module.exports = route;