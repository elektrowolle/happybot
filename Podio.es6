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



    action(request, response, retry) {
        if(retry === undefined) {
            retry = 1;
        }
        if(retry >= 4){
            console.log('too many approaches');
            return;
        }
        //var authCode = request.query.code;
        //var errorCode = request.query.error;
        var $this = this;
        podio.isAuthenticated().then(function () {
            console.log('podio is connected');
            console.log('request was successful');
            return request();
        }).then(response)
        .catch(function (err) {
            console.log('No podio connection. Try to authenticate.' );
            console.log(err);
            console.log(JSON.stringify(err));

            podio.authenticateWithCredentials(
            process.env.podioUsername,
            process.env.podioPassword,
            function() {
                $this.action(request, response, retry + 1);
            });
        });
    }
}

//var p = new PodioInstance();
//p.action(()=>{return p.podio.request('GET', '/apps/')}, (response)=>{console.log(response)});
// Your request handler (for example in ExpressJS)
