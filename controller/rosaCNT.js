const rosa = require('../model/rosa.js');
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

module.exports = {
    insertOnePlayer: insertOnePlayer
};