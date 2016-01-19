"use strict";

var Firebase = require('firebase');

module.exports = class HappyKnowledge {




    constructor(user,slackId,date,happydex, id){
        this.id          = id;
        this.user        = user;
        this.slackId     = slackId;
        this.date        = date;
        this.happydex    = happydex;

        var fireBaseRefUrl = process.env.firebaseRoot + '/' + this.slackId + '/' + this.date;
        this.fire = new Firebase(
            fireBaseRefUrl);
            //process.env.firebaseRoot);

        console.log("new Knowledge ("+ fireBaseRefUrl +"): " );
        console.log(this);
    }

    static get(slackId, date, _callback){

    }

    write(){
        //this.fire.

        var json = this.getJSON();

        console.log("try to save Happyknowledge");
        console.log(json);
        this.fire.set(json,
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
        _json.happydex    = this.happydex;

        //return JSON.stringify(_json);
        return (_json);
    }




};