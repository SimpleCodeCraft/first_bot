"use strict";

import axios from "axios";
const apiKey = "d3538c1541797659b6c8bc5d092411b1";

export default async ({ latitude, longitude }) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${"ua"}&units=metric&appid=${apiKey}`;

  if (latitude && longitude) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
