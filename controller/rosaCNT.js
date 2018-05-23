const rosa = require('../model/rosa.js');
const user = require('../model/user.js');
let d = new Date();

function insertOnePlayer(res,obj) {
    let rosaO= new rosa(obj);
    rosaO.save(err => {
        if (err) {
            console.log(d.toLocaleString() + '\tinsertOnePlayer() Reference not found');
            res.status(404).json({message: 'Reference not found', error: '404'}).end();
        } else {
            console.log(d.toLocaleString() + '\tinsertOnePlayer()');
            res.status(200).send('200').end();
        }
    });
}

function createTeam(res,obj){
    let rosaO= new rosa(obj);
    rosaO.save(err =>{
        if(err){
            console.log(d.toLocaleString() + '\tcreateTeam() Duplicate team');
            res.status(409).json({message: 'Duplicate team', error: '409'}).end();
        }else{

            user.findOneAndUpdate({team: obj.name},{ budget: obj.budget}, function (err,data) {
                console.log(data);
            });
            console.log(d.toLocaleString() + '\tcreateTeam()');

            res.status(200).send('200').end();
        }
    });

}

module.exports = {
    insertOnePlayer: insertOnePlayer,
    createTeam: createTeam
};