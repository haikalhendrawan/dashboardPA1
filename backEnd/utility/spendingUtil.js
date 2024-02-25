import { format } from "date-fns";

export async function parseAndSortDate (row){ // return seluruh row yang udah di sort descending 
  const allDate = row.map((item) => {
    const [day, month, year] = item.tanggal.split("/");
    const date = new Date(year, month-1, day);
    return {...item, date}
  });
  const sortedDesc = allDate?.sort((a, b) => b.date-a.date);
  return sortedDesc
};

export async function filterAcc60(data){
  return data.filter((item) => {                    
    const account = parseInt(item.akun.slice(0,2));
    return account <60
  }); 
};

// get data dalam range tanggal tertentu
export async function getRangedData(data, startDate, endDate){

  if(!data){return false}

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const rangedArray = data.filter((item) => {
    const itemDate = item.date;
    return itemDate>=startDate && itemDate<=endDate 
  })

  return rangedArray
}

export async function getXLabel(data){

  if(!data){return false}

  let array = [];

  data.map((item) => {
    const dateString = format(item.date, "MM/dd/yyyy");
    if (array.includes(dateString) === false){array.push(dateString)}
  });

  return array
}

export async function getYLabel(data, xLabel, akun){
  if(!data){return false}

  let array = [];

  xLabel.map((item) => {
    const total = data.reduce((a, c) => {
      const itemAkun = parseInt(c.akun.slice(0,2));
      return format(c.date, "MM/dd/yyyy") === item && itemAkun===akun? (a + parseInt(c.amount)) : a;
    }, 0)
    array.push(total)
  });

  return array
}

export async function getXAndY(spending){
  // chart tren per jenis belanja
  const today = new Date();

  // get last 30 day data
  const todayMin30 = new Date(new Date().setDate(today.getDate()-29));
  const endDate = today; 
  const ranged30day = await getRangedData(spending, todayMin30, endDate);
  const x = await getXLabel(ranged30day);
  const y51 = await getYLabel(ranged30day, x, 51) ;
  const y52 = await getYLabel(ranged30day, x, 52);
  const y53 = await getYLabel(ranged30day, x, 53);

  // get last month data
  const firstDateCurrMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDateCurrMonth = new Date(today.getFullYear(), today.getMonth()+1, 1) - 1;
  const rangedMonth = await getRangedData(spending, firstDateCurrMonth, lastDateCurrMonth);
  const x2 = await getXLabel(rangedMonth)
  const y251 = await getYLabel(rangedMonth, x2, 51);
  const y252 = await getYLabel(rangedMonth, x2, 52);
  const y253 = await getYLabel(rangedMonth, x2, 53);

  // get all year data
  const firstDateCurrYear = new Date(today.getFullYear(), 0, 1);
  const lastDateCurrYear= new Date(today.getFullYear(), 11, 31);
  const rangedYear = await getRangedData(spending, firstDateCurrYear, lastDateCurrYear);

  const x3 = await getXLabel(rangedYear);
  const y351 = await getYLabel(rangedYear, x3, 51);
  const y352 = await getYLabel(rangedYear, x3, 52);
  const y353 = await getYLabel(rangedYear, x3, 53);

  console.log(x)

  return {x, x2, x3, y51, y52, y53, y251, y252, y253, y351, y352, y353}
}
