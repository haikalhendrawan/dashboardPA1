import mysql from "mysql2/promise";
import "dotenv/config";


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 20,
});

if(!pool){
  console.log("fail to connect to database")
}else{
  console.log("connected to database")
};



export default pool;

