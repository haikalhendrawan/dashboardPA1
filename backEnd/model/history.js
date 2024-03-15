import pool from "../config/db.js";


async function getUpdateHistory() {
  try {
    const q = "SELECT * FROM update_history ORDER BY update_id DESC LIMIT 1";
    const [rows] = await pool.execute(q);
    console.log(rows)
    return rows
  } catch (err) {
    return err
  }
}

async function addUpdateHistory(){
  try{
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const value = `${month}-${date}-${year}`;

    const q = "INSERT INTO update_history (update_time) VALUES (?)";
    const result = await pool.execute(q, [value]);
    return result
  }catch(err){
    return err
  }
}

export { getUpdateHistory, addUpdateHistory };