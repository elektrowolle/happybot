import SlackConversation from './SlackConversation.js';

module.exports = class HappinessConversation extends SlackConversation{

    onStart(){
        this.channel.send("Let's talk about your happiness. How Happy are you [1 - 5]?");
    }

    onMessage(message, $channel){
        var happydex = parseInt(message);
        if(!isNaN(happydex) && happydex < 5 && happydex >= 1){
            var reply = [];
            reply[1] = "hmm...";
            reply[2] = "is it me?";
            reply[3] = "things could be better?!";
            reply[4] = "good good!";
            reply[5] = "please share your happiness!";

            $channel.send(reply[happydex]);
            $channel.send("Thank you for your reply.");

            this.done = true;

        }else{
            $channel.send("sorry... I didn;t got it.");
            this.onStart();
        }
    }
}