import { getSpending, getBudget, getRevenue, getSpendingPerAccountAndDate,
          addSpending, addBudget, deleteSpending, deleteBudget } from "../model/dipa.js";
import { addUpdateHistory } from "../model/history.js";
import multer from "multer";
import upload from "../config/multer.js";
import {parseAndSortDate, filterAcc60, getXAndY} from "../utility/spendingUtil.js";

// GET REQUEST -------------------------------------------------------------------------
const getAllSpending = async(req, res) => {
  try{
    const data = await getSpending();
    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error', err})
  }
};

const getAllRevenue = async(req, res) => {
  try{
    const data = await getRevenue();
    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error', err})
  }
};

const getAllBudget = async(req, res) => {
  try{
    const data = await getBudget();
    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error', err})
  }
};

const getAllSpending50 = async(req, res) => {
  try{
    const data = await getSpending();
    const filtered = await filterAcc60(data);
    const sorted = await parseAndSortDate(filtered);
    const result= await getXAndY(sorted);

    return res.status(200).json(result)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error', err})
  }
};

const getAccountTrend = async(req, res) => {
  try{
    const data = await getSpendingPerAccountAndDate();
    const filtered = await filterAcc60(data);
    const parsed = await parseAndSortDate(filtered);
    return res.status(200).json(parsed)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error', err})
  }
};


// ADD REQUEST ----------------------------------------------------------------------------
const addAllSpending = async(req, res) => {
  upload(req, res, async(err) => {
    if(err instanceof multer.MulterError){
      return res.status(500).json({isError:true, msg:'fail to upload file'})}

    try{
      await deleteSpending();
      await addSpending(`C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${req.file.filename}`);
      await addUpdateHistory();
      return res.status(200).json({msg:'Data inserted to database'});
    }catch(err){
      return res.status(500).json({isError:true, msg:'Fail to insert data',err});
    }
  })
};

const addAllBudget = async(req, res) => {
  upload(req, res, async(err) => {
    if(err instanceof multer.MulterError){
      return res.status(500).json({isError:true, msg:'fail to upload file'})}

    try{
      await deleteBudget();
      await addBudget(`C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${req.file.filename}`);
      return res.status(200).json({msg:'Data inserted to database'});
    }catch(err){
      return res.status(500).json({isError:true, msg:'Fail to insert data',err});
    }
  })
};






export {
  getAllSpending, 
  getAllRevenue, 
  getAllBudget,
  getAccountTrend, 
  addAllSpending, 
  addAllBudget, 
  getAllSpending50}