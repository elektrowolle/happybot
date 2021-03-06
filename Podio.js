"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Podio = require('podio-js').api;

var podio = undefined;

module.exports = function () {
    function PodioInstance() {
        _classCallCheck(this, PodioInstance);

        if (podio === undefined) {
            podio = new Podio({
                authType: 'password',
                clientId: process.env.podioClientId,
                clientSecret: process.env.podioSecret
            });
        }
        this.podio = podio;
    }

    _createClass(PodioInstance, [{
        key: 'action',
        value: function action(request, response, retry) {
            console.log(podio);
            console.log(request);
            if (retry === undefined) {
                retry = 1;
            }
            if (retry >= 4) {
                console.log('too many approaches');
                return;
            }
            //var authCode = request.query.code;
            //var errorCode = request.query.error;
            var $this = this;
            podio.isAuthenticated().then(function () {
                console.log('podio is connected');
                return request();
            }).then(response).then(function () {
                console.log('request was successful');
            }).catch(function (err) {
                console.log('No podio connection. Try to authenticate.');
                console.log(err);
                console.log(JSON.stringify(err));

                podio.authenticateWithCredentials(process.env.podioUsername, process.env.podioPassword, function () {
                    $this.action(request, response, retry + 1);
                });
            });
        }
    }]);

    return PodioInstance;
}();

//var p = new PodioInstance();
//p.action(()=>{return p.podio.request('GET', '/apps/')}, (response)=>{console.log(response)});
// Your request handler (for example in ExpressJS)

//# sourceMappingURL=Podio.js.map