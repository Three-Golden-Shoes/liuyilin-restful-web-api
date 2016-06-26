var express = require('express');
var router = express();
var fs = require("fs");

router.put('/products/:id',function (req,res) {
    fs.readFile('data.json','UTF-8' ,function (err, data) {
        if (err) {
            res.sendStatus(401);
        }
        if (data === '' || data === {}) {
            res.sendStatus(401);
        }
        var newData = JSON.parse(data);
        var newItem;
        var flag = 1;

        for (var i = 0;i < newData.items.length;i ++){
            if (newData.items[i].id.toString() === req.params.id){
                flag = 0;
                newItem = {
                    "id": newData.items[i].id,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                };

                if ( typeof (req.body.barcode) === 'string' && typeof (req.body.name) === 'string' &&
                    typeof (req.body.unit) === 'string' && typeof (req.body.price) === 'number') {

                    newData.items[i] = newItem;
                    fs.writeFile('data.json', JSON.stringify(newData),  function(err) {
                    });
                    res.status(201).json(newItem);

                    return;
                }
                else res.sendStatus(400);
            }
        }
        if (flag == 1) res.sendStatus(404);
    });

});

module.exports = router;