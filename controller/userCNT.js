const schemas = require('../model/schema.js');
let d= new Date();

function insertOne(res,obj){
   schemas.user.create(obj).then(()=>{
        console.log(d.toLocaleString()+"\tinsertOne()");
        res.status(200).end();
    })
        .catch(()=>{console.log(d.toLocaleString()+"\tERROR insertOne()\n");
            res.status(500).end();
        });

}

function userList(res){
    schemas.user.find({}, function (err,doc) {
        if(err) throw err;
        res.json(doc);
        console.log(d.toLocaleString()+'\tuserList');
    });
}



module.exports = {
    insertOne: insertOne,
    userList: userList
};