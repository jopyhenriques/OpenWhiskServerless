'use strict';

const request = require('request');

module.exports.weather = function (params) {
   const location = params.location || 'Vermont';
   const url = 'https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json';

   return new Promise(function(resolve, reject) {
       request.get(url, function(error, response, body) {
           if (error) {
               reject(error);
           }
           else {
               const condition = JSON.parse(body).query.results.channel.item.condition;
               const text = condition.text;
               const temperature = condition.temp;
               const output = 'It is ' + temperature + ' degrees in ' + location + ' and ' + text;
               resolve({msg: output});
           }
       });
   });
}
