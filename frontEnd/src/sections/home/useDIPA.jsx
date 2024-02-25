import {useState, useEffect, createContext, useContext, memo, useMemo} from "react";
import axios from "axios";
import {format} from "date-fns";
//-----------------------------------------

/*
  @Spending data model                               @Budget data model
  [                                                  [
    {                                                 {
      akun: string                                      akun: string                                   
      amount: string                                    amount: string
      ba: string                                        ba: string
      baes1: string                                     baes1: string
      budget_type: string - bilangan 1 digit            budget_type: string - bilangan 1 digit
      date: date                                        
      kanwil: string                                    kanwil: string
      kdsatker: string                                  kdsatker: string
      kegiatan: string                                  kegiatan: string
      kewenangan: string                                kewenangan: string
      kppn: string                                      kppn: string
      lokasi: string                                    lokasi: string
      output: string                                    output: string
      program: string                                   program: string
      sumber_dana: string                               sumber_dana: string
      tanggal: string                                   nmsatker:string
      nmsatker:string                                   uraianba:string 
      uraianba:string                                  
    }                                                  }
  ]                                                   ]
*/

const DipaContext = createContext({});

const DipaProvider = memo(({children}) => {
  const [spending, setSpending] = useState(null);
  const [budget, setBudget] = useState(null);

  // akun 51-59 only
  async function getSpendingData(){
    const result = await axios.get("http://localhost:3015/getAllSpending"); 
    const filteredSpending = result.data.filter((item) => {                    
      const account = parseInt(item.akun.slice(0,2));
      return account <60
    }); 
    setSpending(parseAndSortDate(filteredSpending));   // return seluruh row yang udah di sort descending
  };                                              // format tanggal Datetime {MM-DD-YYYY HH:MM:SS}

  // akun 51-59 only
  async function getBudgetData(){
    const result = await axios.get("http://localhost:3015/getAllBudget");
    const filteredBudget = result.data.filter((item) => {                     
      const account = parseInt(item.akun.slice(0,2));
      return account <60
    }); 
    setBudget(filteredBudget);
  };


  useEffect(() => {
    getSpendingData();
    getBudgetData();
  }, [])

  function parseAndSortDate (row){  // return seluruh row yang udah di sort descending
    const allDate = row?.map((item) => {
      const [day, month, year] = item.tanggal.split("/");
      const date = new Date(year, month-1, day);
      return {...item, date}
    });
    const sortedDesc = allDate?.sort((a, b) => b.date-a.date);
    return sortedDesc
  };

 


  return(
    <DipaContext.Provider value={{spending, getSpendingData, budget, getBudgetData}}>
      {children}
    </DipaContext.Provider>
  )
})

export default function useDIPA() {
  return useContext(DipaContext)
};


export {DipaProvider}
