const rosa = require('../model/rosa.js');
const user = require('../model/user.js');
let d = new Date();

/*function insertOnePlayer(res, obj) {
    let rosaO = new rosa(obj);
    rosaO.save(err => {
        if (err) {
            console.log(d.toLocaleString() + '\tinsertOnePlayer() Reference not found');
            res.status(404).json({message: 'Reference not found', error: '404'}).end();
        } else {
            console.log(d.toLocaleString() + '\tinsertOnePlayer()');
            res.status(200).send('200').end();
        }
    });
}*/

function createTeam(res, obj) {
    let teamObj = [];
    let tl = obj.team.length;
    for (let i = 0; i < tl; i++) {
        let objI = {player: obj.team[i].Player, PLteam: obj.team[i].Team, roule: obj.team[i].Roule};
        teamObj.push(objI);
    }

    let obj2 = {
        name: obj.name,
        team: teamObj,
    };

    let rosaO = new rosa(obj2);
    rosaO.save(err => {
        if (err) {
            console.log(d.toLocaleString() + '\tcreateTeam() Duplicate team');
            res.status(409).json({message: 'Duplicate team', error: '409'}).end();
        } else {
            user.findOneAndUpdate({team: obj.name}, {budget: obj.budget});
            console.log(d.toLocaleString() + '\tcreateTeam()');
            res.status(200).send('200').end();
        }
    });
}

function getPointsByTeam(res, obj) {
    rosa.findOne({name: obj.team}, {positions: 1, points: 1, _id: 0}, function (err, doc) {
        res.json(doc);
    });
}


function getRosa(res, obj) {
    rosa.findOne({name: obj.name}, {team: 1, _id: 0}, function (err, doc) {
        res.json(doc);
    });
}

function formazione(res, obj) {

    if (d.getDay() === 5) {
        console.log(d.toLocaleString() + '\tformazione() TIMEOUT');
        res.status(409).send({message: "Time out!! you can not deploy Friday training", status: 409});
    } else {
        rosa.findOne({name: obj.name}, function (err, doc) {

            let len1 = obj.team.length;
            let len2 = doc.team.length;
            let j = 0;

            for (let i = 0; i < len2; i++) {
                while (j < len1 && doc.team[i].player !== obj.team[j].player) {
                    j++;
                }
                if (j < len1) {
                    doc.team[i].titolare = 1;
                } else {
                    doc.team[i].titolare = 0;
                }
                j = 0;
            }
            rosa.update({name: obj.name}, {team: doc.team}, function (err, doc) {
                if(err){console.log(d.toLocaleString() + '\tformazione() UPDATE ERROR');}
                console.log(d.toLocaleString() + '\tformazione()');
                res.json({message: "updated training", status: 200})
            });

        });

    }
}

module.exports = {
//    insertOnePlayer: insertOnePlayer,
    createTeam: createTeam,
    getPointsByTeam: getPointsByTeam,
    getRosa: getRosa,
    formazione: formazione,
};