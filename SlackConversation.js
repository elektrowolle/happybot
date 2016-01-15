"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function SlackConversation(slack) {
        _classCallCheck(this, SlackConversation);

        this.slack = slack;
        this.conditions = [];
        this.history = [];
    }

    _createClass(SlackConversation, [{
        key: "process",
        value: function process(message) {
            this.history.push(message);
            var channel = this.slack.getChannelByID(message.channel);
            var user = this.slack.getUserByID(message.user);
            var message = message.text;

            channel.send(JSON.stringify(this.history));
        }
    }]);

    return SlackConversation;
}();

//# sourceMappingURL=SlackConversation.js.map