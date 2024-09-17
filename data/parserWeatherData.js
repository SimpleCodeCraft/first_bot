"use strict";

const parseFunctions = {
  windDirection: function (direction) {
    if (
      (direction >= 0 && direction < 23) ||
      (direction >= 338 && direction <= 360)
    ) {
      return "Північний";
    } else if (direction >= 23 && direction < 68) {
      return "Північно-східний";
    } else if (direction >= 68 && direction < 113) {
      return "Східний";
    } else if (direction >= 113 && direction < 158) {
      return "Південно-східний";
    } else if (direction >= 158 && direction < 203) {
      return "Південний";
    } else if (direction >= 203 && direction < 248) {
      return "Південно-західний";
    } else if (direction >= 248 && direction < 293) {
      return "Західний";
    } else if (direction >= 293 && direction < 338) {
      return "Північно-західний";
    } else {
      const error = new Error(
        "Помилка: Неверне значення напряму\nФункція parseDirection"
      );
      throw error;
    }
  },
};


module.exports = parseFunctions;

