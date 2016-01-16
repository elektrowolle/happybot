"use strict";

var Podio = require('podio-js').api;

var podio = undefined;

module.exports = class PodioInstance{
    constructor() {
        if(podio === undefined) {
            podio = new Podio({
                authType: 'password',
                clientId: process.env.podioClientId,
                clientSecret: process.env.podioSecret
            });
        }
    }



    action(request, response) {
        var authCode = request.query.code;
        var errorCode = request.query.error;

        podio.isAuthenticated().then(function () {
            console.log('podio is connected');
        }).catch(function (err) {
            podio.authenticateWithCredentials(
                process.env.podioUsername,
                process.env.podioPassword,
                function() {
                // Make API calls here...
            });
        });
    }



}
// Your request handler (for example in ExpressJS)
