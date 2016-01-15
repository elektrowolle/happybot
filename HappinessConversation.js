'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SlackConversation2 = require('./SlackConversation.js');

var _SlackConversation3 = _interopRequireDefault(_SlackConversation2);

var _HappyKnowledge = require('./HappyKnowledge.js');

var _HappyKnowledge2 = _interopRequireDefault(_HappyKnowledge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_SlackConversation) {
    _inherits(HappinessConversation, _SlackConversation);

    function HappinessConversation() {
        _classCallCheck(this, HappinessConversation);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HappinessConversation).apply(this, arguments));
    }

    _createClass(HappinessConversation, [{
        key: 'onStart',
        value: function onStart() {
            this.channel.send("Let's talk about your happiness. How Happy are you [1 - 5]?");
        }
    }, {
        key: 'onMessage',
        value: function onMessage(message, _channel) {
            console.log(message);
            console.log(_channel);
            var happydex = parseInt(message);
            if (!isNaN(happydex) && happydex <= 5 && happydex >= 1) {
                var reply = [];
                reply[1] = "hmm...";
                reply[2] = "is it me?";
                reply[3] = "things could be better?!";
                reply[4] = "good good!";
                reply[5] = "please share your happiness!";

                this.channel.send(reply[happydex]);
                this.channel.send("Thank you for your reply.");

                var knowledge = new _HappyKnowledge2.default(this.user.name, this.user.id, Date.now().toString(), happydex);
                knowledge.write();

                this.done = true;
            } else {
                console.log(happydex);
                this.channel.send("sorry... I didn;t got it.");
                this.onStart();
            }
        }
    }]);

    return HappinessConversation;
}(_SlackConversation3.default);

//# sourceMappingURL=HappinessConversation.js.map