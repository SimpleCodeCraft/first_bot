"use strict";
import getWeatherData from "./data/weather.js";
import windDirection from "./data/parserWeatherData.js";
import dateF from "./data/date.js";

import TelegramApi from "node-telegram-bot-api";
import getMillitaryData from "./data/millitary.js";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TOKEN;
const bot = new TelegramApi(token, { polling: true });

const startOptons = {
  reply_markup: {
    keyboard: [
      [{ text: "Погода" }],
      [{ text: "Статистика по втратам ворога" }],
    ],
    resize_keyboard: true, // Автоматическое изменение размера кнопок
    one_time_keyboard: true, // После нажатия кнопки клавиатура исчезает
  },
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // bot.sendLocation(chatId, 40.712776, -74.005974);
  if (msg.location) {
    try {
      const date = new Date();
      const weatherData = await getWeatherData(msg.location);

      bot.sendMessage(
        chatId,
        `Погода у місті ${weatherData.name}
На ${date.toLocaleTimeString()} ${date.toLocaleDateString()}
Температура: ${weatherData.main.temp.toFixed(
          1,
        )} Відчуття як: ${weatherData.main.temp.toFixed(1)}
${windDirection(
  weatherData.wind.deg,
)} вітер зі швидкістю ${weatherData.wind.speed.toFixed()} м/c та поривами до ${weatherData.wind.gust.toFixed()} м/c
Тиск: ${weatherData.main.pressure}
Відносна вологість повітря: ${weatherData.main.humidity}%
`,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
});


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Отправляем сообщение с кнопками
  bot.sendMessage(chatId, "Оберіть дію:", startOptons);
});

bot.onText(/^Статистика по втратам ворога/, (msg) => {
  const chatId = msg.chat.id;

  // Создаем одну или две кнопки
  const militaryOptions = {
    reply_markup: {
      keyboard: [
        [
          { text: "Загальні втрати" },
          { text: "За останю добу" },
          { text: "По даті" },
        ],
        [{ text: "Назад" }],
      ],
      resize_keyboard: true, // Автоматическое изменение размера кнопок
      one_time_keyboard: false, // После нажатия кнопки клавиатура исчезает
    },
  };

  // Отправляем сообщение с кнопками
  bot.sendMessage(chatId, "Оберіть дію:", militaryOptions);
});

bot.onText(/^Загальні втрати/, async (msg) => {
  const chatId = msg.chat.id;
 
  const millitaryData = await getMillitaryData();
  await bot.sendMessage(
    chatId,
    `Втрати ворога станом на ${millitaryData.data.date}
${millitaryData.data.day} день війни

Особистий склад: ${millitaryData.data.stats.personnel_units}
Танків: ${millitaryData.data.stats.tanks}
Бойових броньованих машин: ${millitaryData.data.stats.armoured_fighting_vehicles}
Артилерійських систем: ${millitaryData.data.stats.artillery_systems}
РСЗВ: ${millitaryData.data.stats.mlrs}
Засоби ППО: ${millitaryData.data.stats.aa_warfare_systems}
Літаків: ${millitaryData.data.stats.planes}
Гелікоптерів: ${millitaryData.data.stats.helicopters}
БПЛА оперативно-тактичного рівня: ${millitaryData.data.stats.uav_systems}
Крилаті ракети: ${millitaryData.data.stats.cruise_missiles}
Кораблі/катери: ${millitaryData.data.stats.warships_cutters}
Автомобільної техніки та автоцистерн: ${millitaryData.data.stats.vehicles_fuel_tanks}
Спеціальна техніка: ${millitaryData.data.stats.special_military_equip}
Підводні човни: ${millitaryData.data.stats.submarines}`,
  );
});

bot.onText(/^За останю добу/, async (msg) => {
  const chatId = msg.chat.id;

  const millitaryData = await getMillitaryData();

  await bot.sendMessage(
    chatId,
    `Втрати ворога за добу ${millitaryData.data.date}
${millitaryData.data.day} день війни

Особистий склад: ${millitaryData.data.increase.personnel_units}
Танків: ${millitaryData.data.increase.tanks}
Бойових броньованих машин: ${millitaryData.data.increase.armoured_fighting_vehicles}
Артилерійських систем: ${millitaryData.data.increase.artillery_systems}
РСЗВ: ${millitaryData.data.increase.mlrs}
Засоби ППО: ${millitaryData.data.increase.aa_warfare_systems}
Літаків: ${millitaryData.data.increase.planes}
Гелікоптерів: ${millitaryData.data.increase.helicopters}
БПЛА оперативно-тактичного рівня: ${millitaryData.data.increase.uav_systems}
Крилаті ракети: ${millitaryData.data.increase.cruise_missiles}
Кораблі/катери: ${millitaryData.data.increase.warships_cutters}
Автомобільної техніки та автоцистерн: ${millitaryData.data.increase.vehicles_fuel_tanks}
Спеціальна техніка: ${millitaryData.data.increase.special_military_equip}
Підводні човни: ${millitaryData.data.increase.submarines}`,
  );
});

bot.onText(/^По даті/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Введіть дату у форматі YYYY MM DD");
});

bot.onText(/\d{4}.\d{1,2}.\d{1,2}/m, async (msg) => {
  const chatId = msg.chat.id;
  const date = dateF.createDate(msg.text);

  let millitaryData;
  try {
    
    millitaryData = await getMillitaryData(date);


    await bot.sendMessage(
      chatId,
      `Втрати ворога за ${millitaryData.data.date}
${millitaryData.data.day} день війни

Особистий склад: ${millitaryData.data.stats.personnel_units} (+${millitaryData.data.increase.personnel_units})
Танків: ${millitaryData.data.stats.tanks} (+${millitaryData.data.increase.tanks})
Бойових броньованих машин: ${millitaryData.data.stats.armoured_fighting_vehicles} (+${millitaryData.data.increase.armoured_fighting_vehicles})
Артилерійських систем: ${millitaryData.data.stats.artillery_systems} (+${millitaryData.data.increase.artillery_systems})
РСЗВ: ${millitaryData.data.stats.mlrs} (+${millitaryData.data.increase.mlrs})
Засоби ППО: ${millitaryData.data.stats.aa_warfare_systems} (+${millitaryData.data.increase.aa_warfare_systems})
Літаків: ${millitaryData.data.stats.planes} (+${millitaryData.data.increase.planes})
Гелікоптерів: ${millitaryData.data.stats.helicopters} (+${millitaryData.data.increase.planes})
БПЛА оперативно-тактичного рівня: ${millitaryData.data.stats.uav_systems} (+${millitaryData.data.increase.uav_systems})
Крилаті ракети: ${millitaryData.data.stats.cruise_missiles} (+${millitaryData.data.increase.cruise_missiles})
Кораблі/катери: ${millitaryData.data.stats.warships_cutters} (+${millitaryData.data.increase.warships_cutters})
Автомобільної техніки та автоцистерн: ${millitaryData.data.stats.vehicles_fuel_tanks} (+${millitaryData.data.increase.vehicles_fuel_tanks})
Спеціальна техніка: ${millitaryData.data.stats.special_military_equip} (+${millitaryData.data.increase.special_military_equip})
Підводні човни: ${millitaryData.data.stats.submarines} (+${millitaryData.data.increase.submarines})`,
    );
    
    } catch (error) {
      bot.sendMessage(chatId, error);
      console.log(error);
    //      throw error;
    }
});

bot.onText(/^\d{1,3}\D+/m, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Невірна дата\nВведіть дату у форматі YYYY MM DD`);
});

bot.onText(/Погода/, (msg) => {
  const chatId = msg.chat.id;

  const getLocationButton = {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Надіслати геолокацію",
            request_location: true, // Эта кнопка запросит у пользователя локацию
          },
          {
            text: "Ввести назву міста",
          },
        ],
        [
          {
            text: "Назад",
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true, // Клавиатура исчезнет после одного использования
    },
  };

  bot.sendMessage(
    chatId,
    "Потрібно отримати вашу геолокацію",
    getLocationButton,
  );

  // if (msg.location) {
  //   console.log(msg.location);
  // } else console.log("Локации нет");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (String(text).startsWith("Назад")) {
    bot.sendMessage(chatId, "Оберіть дію:", startOptons);
  }
});
