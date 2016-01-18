"use strict";

var Firebase = require('firebase');

module.exports = class HappyKnowledge {




    constructor(user,slackId,date,happydex, id){
        this.id          = id;
        this.user        = user;
        this.slackId     = slackId;
        this.date        = date;
        this.happydex    = happydex;
        this.fire        = new Firebase(
            process.env.firebaseRoot + '/' + this.slackId + '/' + this.date);
    }

    static get(slackId, date, _callback){

    }

    write(){
        this.fire.set(JSON.stringify(this));
    }




};