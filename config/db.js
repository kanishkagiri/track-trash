const mysql=require("mysql2");
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"track_trash"
});
db.connect((err)=>{
    if(err){
        console.error("Database not connected");
    }
    else{
        console.log("Database connected");
    }
})
module.exports=db;