module.exports = class SlackConversation{
    constructor(slack) {
        this.slack      = slack;
        this.conditions = [];
        this.history    = [];
    }


    process(message){
        this.history.push(message);
        var channel = this.slack.getChannelByID(message.channel);
        var user    = this.slack.getUserByID(message.user);
        var message = message.text;

        channel.send(JSON.stringify(this.history));
    }
};