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
        console.log("try to save Happyknowledge");

        //this.fire.

        this.fire.set(this.getJSON(),
            (error)=>{
                if (error) {
                    console.log("Data could not be saved." + error);
                } else {
                    console.log("Data saved successfully.");
                }
            }
        );
    }

    getJSON(){
        var _json = {};
        //_json.id          = this.id;
        _json.user        = this.user;
        _json.slackId     = this.slackId;
        _json.date        = this.date;
        _json.happydex    = this.happydex;

        //return JSON.stringify(_json);
        return (_json);
    }




};