import {useState, useEffect} from "react";
import axios from "axios";
import {format} from "date-fns";

export default function useDIPA() {
  const [data, setData] = useState(null);

  // return seluruh row yang udah di sort descending, format tanggal Datetime {MM-DD-YYYY HH:MM:SS}
  async function getData(){
    const result = await axios.get("http://localhost:3015/getAllSpending");
    setData(parseAndSortDate(result.data));
  };

  function parseAndSortDate(row){
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

  return {data, getData, getLast30Days, getY30Days}

}