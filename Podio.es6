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
        this.podio = podio;
    }



    action(request, response) {
        //var authCode = request.query.code;
        //var errorCode = request.query.error;
        var $this = this;
        podio.isAuthenticated().then(function () {
            console.log('podio is connected');
            return request();
        }).then(response(responseData))
        .catch(function (err) {
            podio.authenticateWithCredentials(
            process.env.podioUsername,
            process.env.podioPassword,
            function() {
                $this.action(request, response);
            });
        });
    }
}

//var p = new PodioInstance();
//p.action(()=>{return p.podio.request('GET', '/apps/')}, (response)=>{console.log(response)});
// Your request handler (for example in ExpressJS)
