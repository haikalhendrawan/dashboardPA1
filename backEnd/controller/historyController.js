import { getUpdateHistory } from "../model/history.js";


const getLastUpdateHistory = async (req, res) => {
  try{
    const data = await getUpdateHistory();

    return res.status(200).json(data)
  }catch(err){
    return res.status(500).json({isError:true, msg:'Internal server error', err})
  }
};

export {getLastUpdateHistory};