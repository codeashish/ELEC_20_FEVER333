		var request = require('request');
var cmd = require('node-cmd');


const geoloc = (ip, callback) => {

    const urlip = 'https://ipvigilante.com/' + ip;
    console.log(urlip);
    request({
        url: urlip,
        json: true
    }, (err, res) => {

        if (!err) {
            callback(undefined, res.body.data);
        }

    });

}


module.exports=geoloc;