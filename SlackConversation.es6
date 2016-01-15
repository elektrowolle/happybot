module.exports = class SlackConversation{
    constructor(slack, channel, user) {
        this.slack      = slack;
        this.conditions = [];
        this.history    = [];
        this.channel    = channel;
        this.user       = user;
        this.done       = false;
        this.onStart();
    }

    onStart(){
        this.channel.send('Hi! Nice to talk to you ' + this.user.name);
    }


    process(_message){
        this.history.push(_message);
        var _channel = _message.channel;
        var message  = _message.text;
        this.onMessage(message, _channel);
    }

    onMessage(message, _channel){
        _channel.send(JSON.stringify(this.history));
    }
};