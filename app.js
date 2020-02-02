var express = require("express");
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
var fs = require('fs');
var geoip = require('./geoip/ipfind.js');
var geoloc = require('./geoip/locationfind.js');
var multer = require('multer');


mongoose.connect("mongodb://localhost/medapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
});

var geoip = require('./geoip/ipfind.js');
var geoloc = require('./geoip/locationfind.js');




var bodyParser = require("body-parser");
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
        extended: true
}));


var medSchema = new mongoose.Schema({
        shopname: String,
        coordinates: [{
                type: Number
        }],
        medicines: [{
                type: String
        }],
        images: String,
        address: String,
        // img: 
        //   { data: Buffer, contentType: String },





});

var med = mongoose.model("med", medSchema);

//  med.create({

//          shopname:'diksha medical store',
//          address:"punjab",

//          medicines:['fexofenadine','aciloc','isoniazid','rifampicin','pyrazinamide','ethambutol','combiflame'],

//           images:"https://image.shutterstock.com/image-photo/drug-prescription-treatment-medication-pharmaceutical-260nw-512525938.jpg",
//           coordinates:[31.258171,75.706748],



//          })

// med.create({

//         shopname:'dev Hospital,LPU',
//         address:"kohta ,hamirpur",
    
//         medicines:['antihistamin','aciloc','robitusin','benadryl','deoxycycline','honitus','combiflame'],
    
//          images:"https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//          coordinates:[31.731789, 76.532090],
    
    
            
//         })

app.get('/', (req, res) => {

        res.render('index.html');
}).listen(8080)


// app.get('/maps', (req, res) => {
//         res.render('map.html',{



//         });
// });

// app.get('/find',cors(), function (req, res) {
//     var medi = req.params.query;
//     console.log(medi.name);
//     med.find({
//         'medicines': medi
//     }, function (err, result) {
//         if (err) {
//             console.log(err)
//         };
//         if (result) {
//             console.log(res.medicines);
//         } else {
//             res.send(JSON.stringify({
//                 error: 'Error'
//             }))
//         }
//     })
// });


app.post('/find', cors(), function (req, res) {
        var medi = req.body.name.toLowerCase();
        // console.log(req.body);
        med.find({
                'medicines': medi
        }, function (err, shops) {
                if (err) {
                        console.log(err);
                };
                if (shops) {
                        // res.json(shops[0].shopname);
                        // console.log(result[0].shopname);
                        res.render('shop.html', {
                                shops: shops
                        });
                } else {
                        res.send(JSON.stringify({
                                error: 'Error'
                        }))
                }
        })
});


app.get('/maps', (req, res) => {






        var coordinates = {
                latitude: Number(req.query.latitude),
                longitude: Number(req.query.longitude)
        };
        // var coordinatesarray=[Number(req.query.latitude),Number(req.query.longitude)];

        console.log(coordinates);
        res.render('map.html', {
                coordinates
        });

});


app.post('/maps', function (req, res) {
        var coordinates = {
                latitude: Number(req.query.latitude),
                longitude: Number(req.query.longitude)
        };
        // var coordinatesarray=[Number(req.query.latitude),Number(req.query.longitude)];

        // console.log(coordinates);
        res.render('map.html', {
                coordinates
        });

});






app.get("/getshops", (req, res) => {
        var medicine = req.query.medname;
        med.find({
                'medicines': medicine,
        }, function (err, shops) {
                if (err) {
                        console.log(err);
                };
                if (shops) {
                        // res.json(shops[0].shopname);
                        // console.log(result[0].shopname);
                        res.render('shop.html', {
                                shops: shops
                        });
                } else {
                        res.send(JSON.stringify({
                                error: 'Error'
                        }))
                }
        })

});
