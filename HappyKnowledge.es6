"use strict";

var podio = require('./podio.js');
var map = {
    'title'    : "titel",
    'slackId'  : "slackId",
    'date'     : "datum",
    'happydex' : "happydex",
};

module.exports = class HappyKnowledge {


    static getAppId(){return env.podioHappyKnowledgeAppId;}

    constructor(title,slackId,date,happydex, id){
        this.id       = id;
        this.title    = title;
        this.slackId  = slackId;
        this.date     = date;
        this.happydex = happydex;
    }

    static get(id, _callback){
        podio.request('get', '/item/' + id, null, (responseData)=>{
            _callback(new HappyKnowledge(
                responseData[map['title']   ],
                responseData[map['slackId'] ],
                responseData[map['date']    ],
                responseData[map['happydex']])
            );
        });
    }

    write(){
        podio.request('post', '/item/', JSON.stringify(this.map()));
    }

    static map(knowledge){
        var mapped = {};
        for(var key in map){
            mapped[map[key]] = this[key];
        }
        return mapped;
    }

    map(){
        return HappyKnowledge.map(this);
    }


};