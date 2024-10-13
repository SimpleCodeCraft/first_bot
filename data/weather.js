"use strict";

import got from "got";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.OPENWEATHER_API_KEY;

export default async ({ latitude, longitude }) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${"ua"}&units=metric&appid=${apiKey}`;

  if (latitude && longitude) {
    try {
      const response = await got(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
