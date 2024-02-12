import { getSpending, getSpendingBudget } from "../model/dipa.js";


const getAllSpending = async(req, res) => {
  try{
    const data = await getSpending();
    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error'})
  }
};
const getAllSpendingBudget = async(req, res) => {
  try{
    const data = await getSpendingBudget();
    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error'})
  }
};


export {getAllSpending, getAllSpendingBudget}