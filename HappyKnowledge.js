"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Firebase = require('firebase');

module.exports = function () {
    function HappyKnowledge(user, slackId, date, happydex, id) {
        _classCallCheck(this, HappyKnowledge);

        this.id = id;
        this.user = user;
        this.slackId = slackId;
        this.date = date;
        this.happydex = happydex;
        this.fire = new Firebase(process.env.firebaseRoot + '/' + this.slackId + '/' + this.date);
    }

    _createClass(HappyKnowledge, [{
        key: 'write',
        value: function write() {
            this.fire.set(JSON.stringify(this.getJSON()), function (response) {
                conole.log(response);
            });
        }
    }, {
        key: 'getJSON',
        value: function getJSON() {
            var _json = {};
            _json.id = this.id;
            _json.user = this.user;
            _json.slackId = this.slackId;
            _json.date = this.date;
            _json.happydex = this.happydex;

            return JSON.stringify(_json);
        }
    }], [{
        key: 'get',
        value: function get(slackId, date, _callback) {}
    }]);

    return HappyKnowledge;
}();

//# sourceMappingURL=HappyKnowledge.js.map