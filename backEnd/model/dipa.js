import pool from "../config/db.js";

const getSpending = async() => {
  try{
    const q = "SELECT * FROM real_belanja";
    const [rows] = await pool.execute(q);
    return rows
  }catch(err){
    console.log(err)
  }
};

const getSpendingBudget = async() => {
  try{
    const q = "SELECT * FROM pagu_belanja";
    const [rows] = await pool.execute(q);
    return rows
  }catch(err){
    console.log(err)
  }
};


export {getSpending, getSpendingBudget}