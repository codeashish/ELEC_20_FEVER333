var request = require('request');
var cmd = require('node-cmd');

const geoip = (callback) => {
    request({
        url: 'https://ipinfo.io/ip',
        json: true
    }, (err, data) => {

        if (!err) {
            callback(undefined, {
                ip: data.body
            });
        } else {
            callback(err, undefined);
        }
    });


}

module.exports=geoip;