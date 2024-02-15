import { getSpending, getBudget, getRevenue, addBudget } from "../model/dipa.js";
import Papa from "papaparse";
import multer from "multer";
import fs from "fs";

const storage= multer.diskStorage(
  { 
    destination:(req, file, callback) => {
      callback(null, './uploads')
    },
    filename:(req, file, callback) => {
      callback(null, file.originalname)
    }
  });

const upload = multer({storage:storage}).single('file')


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
    return res.status(200).json({data})
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error'})
  }
};

const addAllBudget = async(req, res) => {

    upload(req, res, (err) => {
      if(err instanceof multer.MulterError){return console.log(err)}
      const file = req.file;
      const csv = fs.readFileSync(`./uploads/${req.file.filename}`, 'utf8');
      const json = Papa.parse(csv);
      addBudget(json.data[1])
      return res.status(200).json({head:json.data[0], row:json.data[1]});
    })
};


export {getAllSpending, getAllRevenue, getAllBudget, addAllBudget}