"use strict";

const axios = require("axios");
const { getCurrentDate, getYesterdayDate } = require("./date");

module.exports = async function (date) {
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

  const url = `https://russianwarship.rip/api/v2/statistics/${getCurrentDate()}`;
  const url2 = `https://russianwarship.rip/api/v2/statistics/${getYesterdayDate()}`;

  try {
    const todayData = await axios.get(url);
    if (todayData) {
      return todayData.data;
    } else {
      const yesterdayData = await axios.get(url2);
      return yesterdayData.data;
    }
  } catch {
    console.error("Error with axios data:", error);
    throw error;
  }
};
