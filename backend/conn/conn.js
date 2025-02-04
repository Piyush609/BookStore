const mongooes = require("mongoose");

const conn = async()=>{
    try{
        await mongooes.connect(process.env.URL, {
            dbname : "BookStore"
        });
        console.log("Connect To DataBase");
    }catch(err){
        console.log(err);
    }
};

conn();