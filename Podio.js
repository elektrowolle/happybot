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
        value: function action(request, response) {
            //var authCode = request.query.code;
            //var errorCode = request.query.error;

            podio.isAuthenticated().then(function () {
                console.log('podio is connected');
                return _request();
            }).then(response(response)).catch(function (err) {
                podio.authenticateWithCredentials(process.env.podioUsername, process.env.podioPassword, function () {
                    this.action(request, response);
                });
            });
        }
    }]);

    return PodioInstance;
}();
// Your request handler (for example in ExpressJS)

//# sourceMappingURL=Podio.js.map