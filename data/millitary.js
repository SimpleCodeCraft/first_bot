"use strict";

import axios from "axios";
import timeF from "./date.js";

export default async function (date) {
  if(date){
    const url = `https://russianwarship.rip/api/v2/statistics/${date}`;
    try{
      const dataForDate = await axios.get(url);
      return dataForDate.data;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

  const url = `https://russianwarship.rip/api/v2/statistics/${timeF.getCurrentDate()}`;
  const url2 = `https://russianwarship.rip/api/v2/statistics/${timeF.getYesterdayDate()}`;

  
  let data;
  
  try {
    const todayData = await axios.get(url);
    
      data = todayData.data;
  } catch(error) {
   console.error("Error with axios data:", error);
//   throw error;
  }

 try {
   const yesterdayData = await axios.get(url2);
   data = yesterdayData.data;
 } catch(error) {
 console.error("Error with axios data:", error);
// throw error;
}
  return data;
};
