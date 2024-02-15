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

const getRevenue = async() => {
  try{
    const q = "SELECT * FROM real_pendapatan";
    const [rows] = await pool.execute(q);
    return rows
  }catch(err){
    console.log(err)
  }
};

const getBudget = async() => {
  try{
    const q = "SELECT * FROM pagu_belanja";
    const [rows] = await pool.execute(q);
    return rows
  }catch(err){
    console.log(err)
  }
};

const addBudget = async(data) => {
  try{
    const [kdsatker, ba, baes1, kanwil, kppn, akun, program, kegiatan, output, kewenangan, sumber_dana, lokasi, budget_type, tanggal, amount] = data
    console.log(kdsatker, ba, baes1, kanwil, kppn, akun, program, kegiatan, output, kewenangan, sumber_dana, lokasi, budget_type, tanggal, amount)
    // const q = "SELECT * FROM pagu_belanja";
    // const [rows] = await pool.execute(q);
  }catch(err){
    console.log(err)
  }
};


export {getSpending, getRevenue, getBudget, addBudget}