"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var podio = require('./podio.js');
var _map = {
    'title': "titel",
    'slackId': "slackId",
    'date': "datum",
    'happydex': "happydex"
};

var happyKnowledge = function () {
    _createClass(happyKnowledge, null, [{
        key: 'getAppId',
        value: function getAppId() {
            return env.podioHappyKnowledgeAppId;
        }
    }]);

    function happyKnowledge(title, slackId, date, happydex, id) {
        _classCallCheck(this, happyKnowledge);

        this.id = id;
        this.title = title;
        this.slackId = slackId;
        this.date = date;
        this.happydex = happydex;
    }

    _createClass(happyKnowledge, [{
        key: 'write',
        value: function write() {
            podio.request('post', '/item/', JSON.stringify(this.map()));
        }
    }, {
        key: 'map',
        value: function map() {
            return happyKnowledge.map(this);
        }
    }], [{
        key: 'get',
        value: function get(id, _callback) {
            podio.request('get', '/item/' + id, null, function (responseData) {
                _callback(new happyKnowledge(responseData[_map['title']], responseData[_map['slackId']], responseData[_map['date']], responseData[_map['happydex']]));
            });
        }
    }, {
        key: 'map',
        value: function map(knowledge) {
            var mapped = {};
            for (var key in _map) {
                mapped[key] = knowledge[_map[key]];
            }
            return mapped;
        }
    }]);

    return happyKnowledge;
}();

module.exports = function () {

    return happyKnowledge;
}();

//# sourceMappingURL=happyKnowledge.js.map