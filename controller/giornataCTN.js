const giornata = require('../model/giornata.js');
const rosa = require('../model/rosa.js');
const user = require('../model/user.js');

let LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

let d = new Date();

function getLastDay(res) {
    giornata.findOne({}).sort({day: 'desc'}).limit(1).exec(function (err, docs) {
        console.log(d.toLocaleString() + "\t getLastDay()");
        localStorage.setItem('day', docs.day);
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
        if (rosa != null) {
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

async function sumPoints(res, obj) {
    console.log(obj);
    let userS= await user.find({rooms:obj.room},{nick:1,team:1,_id:0});
    let len=userS.length;
    let toReturn=[];

    for(let i=0;i<len;i++) {
        let rosaS= await rosa.findOne({name: userS[i].team, team: {$elemMatch: {titolare: 1}}}, {team: 1, giornata: 1, points: 1, _id: 0});
        rosaS.team = rosaS.team.filter(calciatore => {
            return calciatore.titolare == 1;
        });
        let points = (rosaS.points);
        let last = points;
        let point = 0;
        let playerName = [];
        let len = rosaS.team.length;
        for (let i = 0; i < len; i++) {
            playerName.push(rosaS.team[i].player);
        }
        let giornataS= await giornata.find({day: localStorage.getItem("day"), player: {$in: playerName}}, {
            day: 0,
            roule: 0,
            player: 0,
            team: 0,
            _id: 0
        });
        let lenG = giornataS.length;

        for (let i = 0; i < lenG; i++) {

            if (giornataS[i].GF > 0) {
                giornataS[i].vote += (3 * giornataS[i].GF);
            } else {
                if (giornataS[i].GS > 0) {
                    giornataS[i].vote -= +(1 * giornataS[i].GS);
                }
            }
            point += giornataS[i].vote;
        }
        points += point;

        if (rosaS.giornata.length === 0) {
            rosaS.giornata.push({'day': obj.day, 'point': point});
            let rosaU= await rosa.update({name: userS[i].team}, {points: points, giornata: rosaS.giornata});
           // rosa.update({name: obj.team}, {points: points, giornata: rosaS.giornata}, function (err, doc) {
                console.log(0);
                toReturn.push({nick:userS[i].nick,points: points.toFixed(2), point: point.toFixed(2)});
                //console.log(toReturn);
            //});
        } else {
            let len = rosaS.giornata.length;
            if (localStorage.getItem("day") > rosaS.giornata[len - 1].day) {
                rosaS.giornata.push({'day': obj.day, 'point': point});
                let rosaU= await rosa.update({name: obj.team}, {
                    points: points,
                    giornata: rosaS.giornata
                });
                    console.log(">");
                    toReturn.push({nick:userS[i].nick,points: points.toFixed(2), point: point.toFixed(2)});
                    //console.log(toReturn);

            } else {
                console.log("else");
                toReturn.push({nick:userS[i].nick,points: last.toFixed(2), point: point.toFixed(2)});
                //console.log(toReturn);
            }
        }
    }
    res.json(toReturn)
   /* user.find({rooms:obj.room},{team:1,_id:0},function (err,result) {
    let len=result.length;
        let toReturn=[];

    for(let i=0;i<len;i++) {

        rosa.findOne({name: result[i].team, team: {$elemMatch: {titolare: 1}}}, {
            team: 1,
            giornata: 1,
            points: 1,
            _id: 0
        }, function (err, formazione) {
            formazione.team = formazione.team.filter(calciatore => {
                return calciatore.titolare == 1;
            });

            let points = (formazione.points);
            let last = points;
            let point = 0;
            let playerName = [];
            let len = formazione.team.length;
            for (let i = 0; i < len; i++) {
                playerName.push(formazione.team[i].player);
            }
            giornata.find({day: localStorage.getItem("day"), player: {$in: playerName}}, {
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
                points += point;

                if (formazione.giornata.length === 0) {
                    formazione.giornata.push({'day': obj.day, 'point': point});
                    rosa.update({name: obj.team}, {points: points, giornata: formazione.giornata}, function (err, doc) {
                        console.log(0);
                        toReturn.push({points: points.toFixed(2), point: point.toFixed(2)});
                        console.log(toReturn);
                    });
                } else {
                    let len = formazione.giornata.length;
                    if (localStorage.getItem("day") > formazione.giornata[len - 1].day) {
                        formazione.giornata.push({'day': obj.day, 'point': point});
                        rosa.update({name: obj.team}, {
                            points: points,
                            giornata: formazione.giornata
                        }, function (err, doc) {
                            console.log(">");
                            toReturn.push({points: points.toFixed(2), point: point.toFixed(2)});
                            console.log(toReturn);
                        });
                    } else {
                        console.log("else");
                        toReturn.push({points: points.toFixed(2), point: point.toFixed(2)});
                        console.log(toReturn);
                    }
                }

            });giornata.find
        });rosa.findOne
    }
        res.json(toReturn);
    });user.find*/
}

async function leaderboard(res, obj) {
   let userS=await user.find({rooms: obj.room}, {_id: 0, team: 1,});
    let len=userS.length;
    let teamName=[];
        for(let i=0; i<len;i++){
            teamName.push(userS[i].team);
        }
let rosaS;
        let pointsA=[];
        for(let i=0;i<len;i++){
        rosaS= await rosa.findOne({name: teamName[i]}, {name:1,points:1,_id:0});
        rosaS.points=rosaS.points.toFixed(2);
        pointsA.push(rosaS);
        }
        res.json(pointsA);
}


module.exports = {
    getLastDay: getLastDay,
    getAllVote: getAllVote,
    getVoteByTeam: getVoteByTeam,
    sumPoints: sumPoints,
    leaderboard: leaderboard
};