'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SlackConversation2 = require('./SlackConversation.js');

var _SlackConversation3 = _interopRequireDefault(_SlackConversation2);

var _HappyKnowledge = require('./HappyKnowledge.js');

var _HappyKnowledge2 = _interopRequireDefault(_HappyKnowledge);

var _browser = require('browser');

var _browser2 = _interopRequireDefault(_browser);

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
            var $b = new _browser2.default();
            var $this = this;
            this.channel.send("Let me have a look:");
            $b.browse('http://www.regenbogenfabrik.de/nl-speisen/news-speisen1.html', function (err, out) {
                var weekday = new Date().getDay();
                var jsdom = require("jsdom").jsdom;
                var jquery = require("jquery");
                var window = jsdom(out.result).createWindow();
                var $ = jquery.create(window);

                var selector = ["#nl-speisen > div > div > p:nth-child(5)", "#nl-speisen > div > div > p:nth-child(7)", "#nl-speisen > div > div > p:nth-child(9)", "#nl-speisen > div > div > p:nth-child(11), #nl-speisen > div > div > p:nth-child(12)", "#nl-speisen > div > div > p:nth-child(14)"];

                $this.channel.send($(selector[weekday]).html);
            });

            $b.on("end", function (err, out) {
                console.log(err);
                console.log(!out ? out : out.result);
                $this.done = true;
            });

            $b.run();
        }
    }, {
        key: 'onMessage',
        value: function onMessage(message, _channel) {}
    }]);

    return HappinessConversation;
}(_SlackConversation3.default);

//# sourceMappingURL=RegenbogenConversation.js.map