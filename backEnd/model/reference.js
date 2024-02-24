import pool from "../config/db.js";


const getSatkerRef = async() => {
  try{
    const q = 'SELECT * FROM ref_satker';
    const [rows] = await pool.execute(q);
    return rows
  }catch(err){
    console.log(err)
  }
};


export{getSatkerRef}