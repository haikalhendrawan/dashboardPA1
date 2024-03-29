import pool from "../config/db.js";


// GET REQUEST -------------------------------------------------------------------------
const getSpending = async() => {
  try{
    const q = `SELECT real_belanja.*, ref_satker.nmsatker, ref_ba.uraianba
                FROM real_belanja
                LEFT JOIN ref_satker
                ON real_belanja.kdsatker = ref_satker.kdsatker
                LEFT JOIN ref_ba
                ON real_belanja.ba = ref_ba.ba`
    const [rows] = await pool.execute(q);
    return rows
  }catch(err){
    return err
  }
};

const getRevenue = async() => {
  try{
    const q = "SELECT * FROM real_pendapatan";
    const [rows] = await pool.execute(q);
    return rows
  }catch(err){
    return err
  }
};

const getBudget = async() => {
  try{
    const q = `SELECT pagu_belanja.*, ref_satker.nmsatker, ref_ba.uraianba
                FROM pagu_belanja
                LEFT JOIN ref_satker
                ON pagu_belanja.kdsatker = ref_satker.kdsatker
                LEFT JOIN ref_ba
                ON pagu_belanja.ba = ref_ba.ba`;
    const [rows] = await pool.execute(q);
    return rows
  }catch(err){
    return err
  }
};

const getSpendingPerAccountAndDate = async() => {
  try{
    const q = `SELECT 
                real_belanja.akun, 
                SUM(real_belanja.amount) AS total, 
                real_belanja.tanggal, 
                ref_akun.nmakun
                  FROM real_belanja
                  LEFT JOIN ref_akun
                  ON real_belanja.akun = ref_akun.kdakun
                  GROUP BY real_belanja.akun, real_belanja.tanggal, ref_akun.nmakun`
    const [rows] = await pool.execute(q);
    return rows
  }catch(err){
    return err
  }
};

// ADD REQUEST ----------------------------------------------------------------------------
const addSpending = async(filePath) => {
  const connection = await pool.getConnection();
  try{
    const q = `LOAD DATA INFILE \'${filePath}\' 
                INTO TABLE real_belanja 
                FIELDS TERMINATED BY ','
                ENCLOSED BY '"'
                LINES TERMINATED BY '\n'
                IGNORE 1 LINES` ;
    const result = await connection.query(q);
    return result
  }catch(err){   
    await connection.rollback();
    return err
  }finally{
    connection.release();
  } 
};

const addBudget = async(filePath) => {
  const connection = await pool.getConnection();
  try{
    const q = `LOAD DATA INFILE \'${filePath}\' 
                INTO TABLE pagu_belanja 
                FIELDS TERMINATED BY ','
                ENCLOSED BY '"'
                LINES TERMINATED BY '\n'
                IGNORE 1 LINES` ;
    const result = await connection.query(q);
    return result
  }catch(err){   
    await connection.rollback();
    return {err}
  }finally{
    connection.release();
  } 
};


// DELETE REQUEST ---------------------------------------------------------------------------------
const deleteSpending = async() => {
  try{
    const q = "DELETE FROM real_belanja WHERE kdsatker IS NOT NULL";
    const result = await pool.execute(q);
    return result
  }catch(err){
    return err
  }
};

const deleteBudget = async() => {
  try{
    const q = "DELETE FROM pagu_belanja WHERE kdsatker IS NOT NULL";
    const result = await pool.execute(q);
    return result
  }catch(err){
    return err
  }
};


export {
  getSpending, 
  getRevenue, 
  getBudget,
  getSpendingPerAccountAndDate, 
  addSpending, 
  addBudget, 
  deleteSpending, 
  deleteBudget}