import { getSpending, getBudget, getRevenue } from "../model/dipa.js";


const getAllSpending = async(req, res) => {
  try{
    const data = await getSpending();
    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error'})
  }
};

const getAllRevenue = async(req, res) => {
  try{
    const data = await getRevenue();
    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error'})
  }
};

const getAllBudget = async(req, res) => {
  try{
    const data = await getBudget();
    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error'})
  }
};


export {getAllSpending, getAllRevenue, getAllBudget}