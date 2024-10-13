"use strict";

import got from "got";
import timeF from "./date.js";

export default async function (date) {
  if(date){
    const url = `https://russianwarship.rip/api/v2/statistics/${date}`;
    try{
      const dataForDate = await got(url);
      return dataForDate.body;
    }
    catch{
      throw new RangeError("Помилка\nЗаписи ведуться від 2024-02-25");
//      console.log("Данни");
//      throw error;
    }
  }

  const url = `https://russianwarship.rip/api/v2/statistics/${timeF.getCurrentDate()}`;
  const url2 = `https://russianwarship.rip/api/v2/statistics/${timeF.getYesterdayDate()}`;

  
  let data;
  
  try {
    const todayData = await got(url);
    
      data = todayData.body;
  } catch(error) {
   console.error("За сьогоді данних немає");
//   throw error;
  }

 try {
   const yesterdayData = await got(url2);
   data = yesterdayData.body;
 } catch(error) {
 console.error("Error with axios data:", error);
// throw error;
}
  return data;
};
