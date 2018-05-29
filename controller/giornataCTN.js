const giornata = require('../model/giornata.js');
const rosa = require('../model/rosa.js');
const user = require('../model/user.js');
let LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

let d = new Date();

function getLastDay(res) {
    giornata.findOne({}).sort({day: 'desc'}).limit(1).exec(function (err, docs) {
        console.log(d.toLocaleString() + "\t getLastDay()");
        localStorage.setItem('day',docs.day);
        res.json(docs.day);
    });
}

function getAllVote(res, obj) {
    giornata.find({day: obj.day}, {_id: 0, day: 0}, function (err, doc) {
        res.json(doc);
    });
}

function getVoteByTeam(res, obj) {
    rosa.findOne({name: obj.team, team: {$elemMatch: {titolare: 1}}}, {team: 1, _id: 0}, function (err, rosa) {
        if(rosa!=null){
        rosa.team = rosa.team.filter(calciatore => {
            return calciatore.titolare == 1;
        });
        let playerName = [];
        let len = rosa.team.length;
        for (let i = 0; i < len; i++) {
            playerName.push(rosa.team[i].player);
        }
        giornata.find({day: obj.day, player: {$in: playerName}}, {day: 0, _id: 0}, function (err, doc) {
            console.log(d.toLocaleString() + "\t getVoteByTeam");
            res.json(doc);
        });
        }
    });
}

function sumPoints(res, obj) {
    //obj.day=2;
    //if(localStorage.getItem("day")>=obj.day){
    rosa.findOne({name: obj.team, team: {$elemMatch: {titolare: 1}}}, {team: 1, giornata:1,points:1,_id: 0}, function (err, formazione) {
        formazione.team = formazione.team.filter(calciatore => {
            return calciatore.titolare == 1;
        });

        let points=(formazione.points);
        let last=points;
        let point=0;
        let playerName = [];
        let len = formazione.team.length;
        for (let i = 0; i < len; i++) {
            playerName.push(formazione.team[i].player);
        }
        giornata.find({day: localStorage.getItem("day")/*obj.day*/, player: {$in: playerName}}, {
            day: 0,
            roule: 0,
            player: 0,
            team: 0,
            _id: 0
        }, function (err, doc) {
            let len = doc.length;

            for (let i = 0; i < len; i++) {

                if (doc[i].GF > 0) {
                    doc[i].vote += (3 * doc[i].GF);
                } else {
                    if (doc[i].GS > 0) {
                        doc[i].vote -= +(1 * doc[i].GS);
                    }
                }
                point += doc[i].vote;
            }
            points+=point;
            if(formazione.giornata.length===0){
                formazione.giornata.push({'day':obj.day, 'point':point});
                rosa.update({name:obj.team},{points:points, giornata:formazione.giornata}, function (err,doc) {
                    console.log(0);
                    res.json({points:points.toFixed(2),point:point.toFixed(2)});
                });
            }else{
                let len=formazione.giornata.length;
                if(localStorage.getItem("day")>formazione.giornata[len-1].day){
                    formazione.giornata.push({'day':obj.day, 'point':point});
                    rosa.update({name:obj.team},{points:points, giornata:formazione.giornata}, function (err,doc) {
                        console.log(">");
                        res.json({points:points.toFixed(2),point:point.toFixed(2)});
                    });
                }else{
                    console.log("else");
                    res.json({points:parseFloat(last).toFixed(2),point:point.toFixed(2)});
                }
            }
            /*if(points-point===last){
                rosa.update({name:obj.team},{points:points}, function (err,doc) {
                    console.log(doc);
                    res.json({points:points.toFixed(2),point:point.toFixed(2)});
                });
            }else{
                rosa.findOne({name:obj.team},{points:1,_id:0},function (err,points) {
                    console.log("else");
                    res.json({points:parseFloat(points.points).toFixed(2),point:point.toFixed(2)});
                });

            }*/

        });

    });
    //}
    /*else{rosa.findOne({name:obj.team},{points:1,_id:0},function (err,doc) {
        if(doc!=null){
         let x= parseFloat(localStorage.getItem('point'))+parseFloat(doc.points);
         //localStorage.setItem('point',0);
        res.json({ points:x.toFixed(2),message:"else"});
        }
    });
        }*/
}

function leaderboard(res,obj){
user.find({rooms:obj.rooms},{_id:0,team:1,nick:1},function (err,doc) {
    if(doc.length===0){
        res.json({message:"Create a room before"}).status(500);
    }else{
        res.json(doc);
    }
});
}


module.exports = {
    getLastDay: getLastDay,
    getAllVote: getAllVote,
    getVoteByTeam: getVoteByTeam,
    sumPoints: sumPoints,
    leaderboard:leaderboard
};