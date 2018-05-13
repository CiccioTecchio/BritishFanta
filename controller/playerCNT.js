
const schemas = require('../model/schema.js');

let d= new Date();

function playerList(res){
        schemas.player.find({}, function (req,doc) {
            res.json(doc);
            console.log(d.toLocaleString()+'\tplayerList');
        });
}

function find(res,query){
    schemas.player.find(query,function (err,doc){
        if(err) throw err
        else {res.json(doc);
              console.log(d.toLocaleString()+'\tfind')}
    }
    );
}


module.exports = {playerList: playerList,
                  find: find};

