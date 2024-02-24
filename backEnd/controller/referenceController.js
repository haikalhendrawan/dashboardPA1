import { getSatkerRef } from "../model/reference.js";


const getAllSatkerRef = async(req, res) => {
  try{
    const data = await getSatkerRef();
    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error', err})
  }
}

export {getAllSatkerRef}