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

module.export = function () {
    _createClass(HappyKnowledge, null, [{
        key: 'getAppId',
        value: function getAppId() {
            return env.podioHappyKnowledgeAppId;
        }
    }]);

    function HappyKnowledge(title, slackId, date, happydex, id) {
        _classCallCheck(this, HappyKnowledge);

        this.id = id;
        this.title = title;
        this.slackId = slackId;
        this.date = date;
        this.happydex = happydex;
    }

    _createClass(HappyKnowledge, [{
        key: 'write',
        value: function write() {
            podio.request('post', '/item/', JSON.stringify(this.map()));
        }
    }, {
        key: 'map',
        value: function map() {
            return HappyKnowledge.map(this);
        }
    }], [{
        key: 'get',
        value: function get(id, _callback) {
            podio.request('get', '/item/' + id, null, function (responseData) {
                _callback(new HappyKnowledge(responseData[_map['title']], responseData[_map['slackId']], responseData[_map['date']], responseData[_map['happydex']]));
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

    return HappyKnowledge;
}();

//# sourceMappingURL=HappyKnowledge.js.map