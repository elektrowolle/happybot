import SlackConversation from './SlackConversation.js';
import HappyKnowledge    from './HappyKnowledge.js';
import Browser           from "browser"

module.exports = class HappinessConversation extends SlackConversation{

    onStart(){
        var $b = new Browser();
        var $this = this;
        this.channel.send("Let me have a look:");
        $b.browse('http://www.regenbogenfabrik.de/nl-speisen/news-speisen1.html', (err, out)=>{
            var weekday = (new Date()).getDay();
            var jsdom = require("jsdom").jsdom;
            var jquery = require("jquery");
            var window = jsdom(out.result).createWindow();
            var $ = jquery.create(window);

            var selector = [
                "#nl-speisen > div > div > p:nth-child(5)",
                "#nl-speisen > div > div > p:nth-child(7)",
                "#nl-speisen > div > div > p:nth-child(9)",
                "#nl-speisen > div > div > p:nth-child(11), #nl-speisen > div > div > p:nth-child(12)",
                "#nl-speisen > div > div > p:nth-child(14)",
            ];

            $this.channel.send($(selector[weekday]).html);
        });

        $b.on("end", (err, out)=>{
            console.log(err);
            console.log(!out ? out : out.result);
            $this.done = true;
        })

        $b.run();
    }

    onMessage(message, _channel){

    }
};