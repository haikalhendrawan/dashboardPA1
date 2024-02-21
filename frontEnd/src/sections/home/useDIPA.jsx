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
      budget_type: string                               budget_type: string
      date: date                                        date: date
      kanwil: string                                    kanwil: string
      kdsatker: string                                  kdsatker: string
      kegiatan: string                                  kegiatan: string
      kewenangan: string                                kewenangan: string
      kppn: string                                      kppn: string
      lokasi: string                                    lokasi: string
      output: string                                    output: string
      program: string                                   program: string
      sumber_dana: string                               sumber_dana: string
      tanggal: string                                   tanggal: string
    }                                                  }
  ]                                                   ]
*/

const DipaContext = createContext({});

const DipaProvider = memo(({children}) => {
  const [spending, setSpending] = useState(null);
  const [budget, setBudget] = useState(null);

  // return seluruh row yang udah di sort descending, format tanggal Datetime {MM-DD-YYYY HH:MM:SS}
  async function getSpendingData(){
    const result = await axios.get("http://localhost:3015/getAllSpending");
    setSpending(parseAndSortDate(result.data));
  };
  async function getBudgetData(){
    const result = await axios.get("http://localhost:3015/getAllBudget");
    setBudget(result.data);
  };


  useEffect(() => {
    getSpendingData();
    getBudgetData();
  }, [])

  function parseAndSortDate (row){
    const allDate = row?.map((item) => {
      const [day, month, year] = item.tanggal.split("/");
      const date = new Date(year, month-1, day);
      return {...item, date}
    });
    const sortedDesc = allDate?.sort((a, b) => b.date-a.date);
    return sortedDesc
    
  };

  // output dalam bentuk array [MM/dd/yyyy, MM/dd,yyy]
  function getLast30Days(row){
    let last30Days = [];
    row?.filter((item) => {
      const dateStr = format(item.date, "MM/dd/yyyy");
      last30Days?.includes(dateStr)
        ?null
        :last30Days.push(dateStr)
    });
    let last30DaysString = last30Days.slice(0, 25);
    return last30DaysString   
  };

  // output dalam bentuk array [int, int, int]
  function getY30Days(array, row){
    let yAxisData = [];
    array?.map((item) => {
      const yAxis = row
      .filter((curr) => format(curr.date, "MM/dd/yyyy") === item)
      .reduce((acc, curr) => acc + parseInt(curr.amount), 0);
      
      yAxisData.push(yAxis)
    })

    return yAxisData
  };


  return(
    <DipaContext.Provider value={{spending, getSpendingData, budget, getBudgetData, getLast30Days, getY30Days}}>
      {children}
    </DipaContext.Provider>
  )
})

export default function useDIPA() {
  return useContext(DipaContext)
};


export {DipaProvider}
