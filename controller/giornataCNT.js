const giornata =require('../model/giornata.js');
let d = new Date();

function testGiornata(res,obj) {
    let giornataO= new giornata(obj);
    giornataO.save(err => {
        if (err) {
            console.log(d.toLocaleString() + '\tinsertOnePlayer() Reference not found');
            res.status(404).json({message: 'Reference not found', error: '404'}).end();
        } else {
            console.log(d.toLocaleString() + '\tinsertGiornata()');
            res.status(200).send(obj).end();
        }
    });
}

module.exports = {
    testGiornata: testGiornata
};