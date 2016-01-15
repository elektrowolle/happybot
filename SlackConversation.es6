module.exports = class SlackConversation{
    constructor(slack, channel, user) {
        this.slack      = slack;
        this.conditions = [];
        this.history    = [];
        this.channel    = channel;
        this.user       = user;



        this.onStart();
    }

    onStart(){
        this.channel.send('Hi! Nice to talk to you ' + this.user.name);
    }


    process(message){
        this.history.push(message);
        var $channel = this.slack.getChannelByID(message.channel);
        var message  = message.text;
        this.onMessage(message);
    }

    onMessage(){
        this.channel.send(JSON.stringify(this.history));
    }
};