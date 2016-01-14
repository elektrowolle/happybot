var Podio = require('podio-js').api;

module.exports = (function () {
    var podio;
    podio = new Podio({
        authType    : 'server',
        clientId    : process.env.podioClientId,
        clientSecret: process.env.podioSecret
    });

    var action = function(request, response) {
        var authCode = request.query.code;
        var errorCode = request.query.error;

        podio.isAuthenticated().then(function () {
            // Ready to make API calls...
        }).catch(function (err) {

            if (typeof authCode !== 'undefined') {
                podio.getAccessToken(authCode, redirectURL, function (err, response) {
                    // make API calls here
                });
            } else if (typeof errorCode !== 'undefined') {
                // a problem occured
                console.log(request.query.error_description);
            } else {
                // start authentication via link or redirect
                console.log(podio.getAuthorizationURL(redirectURL));
            }
        });
    };

});
// Your request handler (for example in ExpressJS)
