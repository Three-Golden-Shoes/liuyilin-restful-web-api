var express = require('express');
var router = express.Router();
var fs = require("fs");

router.post('/products',function (req,res) {

    fs.readFile('data.json','utf-8',function (err,data) {

        console.log(data);
        if (err) {
            res.sendStatus(401);
            return;
        }
        if (data=== '') {
            console.log("准备写入文件");
          //  data = {"count": 0, "items": []};
            data={};
            data.count=0;
            data.items=[];
            console.log(data);
        }
        else {
             data = JSON.parse(data);
            //console.log(newData);
        }
        var item = {
            "id": data.count+1,
            "barcode": req.body.barcode,
            "name": req.body.name,
            "unit": req.body.unit,
            "price": req.body.price
        };

        if ( typeof (req.body.barcode) != 'string' || typeof (req.body.name) != 'string' ||
            typeof (req.body.unit) != 'string' || typeof (req.body.price) != 'number') {

            res.sendStatus(400);

            return;
        }

        data.items.push(item);

        data.count ++;
        console.log(data);

        fs.writeFile('data.json', JSON.stringify(data),  function(err) {
            if (err) {
                return console.error(err);
            }
        });
        res.status(201).json(item);

    });

});

module.exports = router;