const insertUnsetCommandsOnDB = require('./insertUnsetCommandsOnDB');
const getCommandsByNameAndBK = require('./getCommandsByNameAndBK');
const {
  addEventsToDB,
  addForkResultToDB,
  getStatistic
} = require('../methods/db');
const methods = require('../methods');
const checkFork = require('./checkFork');

async function endParsingBets(parseEvents = []) {
  let listEvents = parseEvents.flat(Infinity);
  const commandList = modifyEventsForSaveCommand(listEvents);
  const findedCommand = await getCommandsByNameAndBK(commandList);
  const unsetCommands = getUnsetCommand(commandList, findedCommand);
  await insertUnsetCommandsOnDB(unsetCommands);
  setIdsToEvents(listEvents, findedCommand);
  listEvents = listEvents.filter((i) => !!i.commandId_1 && !!i.commandId_2);
  const statistic = await getStatistic();
  methods.addStatisticToForkResult(listEvents, statistic);
  await addEventsToDB(listEvents);
  let forkResult = checkFork(listEvents);
  forkResult = methods.addStatisticToForkResult(forkResult, statistic);
  await addForkResultToDB(forkResult);
  return forkResult;
}

function modifyEventsForSaveCommand(arr = []) {
  let result = [];
  arr.forEach((ev) => {
    const command_1 = getCommand(ev.command_1, ev);
    const command_2 = getCommand(ev.command_2, ev);
    result.push(command_1, command_2);
  });
  result = result.filter((command, index, baseArr) => {
    const findIndex = baseArr.findIndex(
      (elem) => elem.name === command.name && elem.bkId === command.bkId
      // (elem) => elem.name === command.name || elem.name === command.name
    );
    const flag = findIndex === -1 || !(findIndex < index);
    return flag;
  });
  return result;
}

function getCommand(name, obj) {
  const result = {
    name,
    bkId: obj.bkId,
    ref_tournament: obj.ref_tournament,
    url: obj.url
  };
  return result;
}
function getUnsetCommand(parsedCommnads, commandFromDB) {
  const result = parsedCommnads.filter((item) => {
    const { bkId, name, ref_tournament } = item;
    const findedEl = commandFromDB.find((el) => {
      return (
        el.bkId === bkId &&
        el.name === name &&
        el.ref_tournament.toString() === ref_tournament.toString()
      );
    });
    if (findedEl) {
      item.commandId = findedEl._id;
    }
    return !findedEl;
  });

  return result;
}

function setIdsToEvents(events, commands) {
  events.flat(Infinity).forEach((ev) => {
    const { bkId } = ev;
    const commandName_1 = ev.command_1;
    const commandName_2 = ev.command_2;
    let command_1 = null;
    let command_2 = null;
    commands.some((item) => {
      if (bkId === item.bkId) {
        if (item.name === commandName_1) {
          command_1 = item;
        }
        if (item.name === commandName_2) {
          command_2 = item;
        }
      }
      return !!command_1 && !!command_2;
    });
    if (command_1) {
      ev.commandId_1 = command_1.ref_base_command;
    }
    if (command_2) {
      ev.commandId_2 = command_2.ref_base_command;
    }
  });
  return;
}

module.exports = endParsingBets;

const f = [
  [
    {
      command_1: 'Лідс Юнайтед',
      command_2: 'Ліверпуль',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leeds+United+vs+Liverpool+-+11143498',
      coeff: {
        // w1: 5.45,
        w1: 15.45,
        x: 4.8,
        w2: 1.58,
        w1_x: 2.56,
        w1_w2: 1.23,
        w2_x: 1.19,
        totals: {}
      },
      date: 1618858800000,
      dateStr:
        'Mon Apr 19 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Челсі',
      command_2: 'Брайтон енд Гоув Альбіон',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Chelsea+vs+Brighton+%26+Hove+Albion+-+11324256',
      coeff: {
        w1: 1.62,
        x: 4.05,
        w2: 6.2,
        w1_x: 1.15909,
        w1_w2: 1.29,
        w2_x: 2.46,
        totals: {}
      },
      date: 1618945200000,
      dateStr:
        'Tue Apr 20 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Тоттенгем Готспур',
      command_2: 'Саутгемптон',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Tottenham+Hotspur+vs+Southampton+-+11324259',
      coeff: {
        w1: 1.83,
        x: 3.84,
        w2: 4.6,
        w1_x: 1.24,
        w1_w2: 1.31,
        w2_x: 2.1,
        totals: {}
      },
      date: 1619024400000,
      dateStr:
        'Wed Apr 21 2021 20:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Астон Вілла',
      command_2: 'Манчестер Сіті',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Aston+Villa+vs+Manchester+City+-+11324258',
      coeff: {
        w1: 9.4,
        x: 5.1,
        w2: 1.43,
        w1_x: 3.22,
        w1_w2: 1.23,
        w2_x: 1.10714,
        totals: {}
      },
      date: 1619032500000,
      dateStr:
        'Wed Apr 21 2021 22:15:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Лестер Сіті',
      command_2: 'Вест Бромвіч Альбіон',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leicester+City+vs+West+Bromwich+Albion+-+11324257',
      coeff: {
        w1: 1.61538,
        x: 4.2,
        w2: 5.95,
        w1_x: 1.168,
        w1_w2: 1.28,
        w2_x: 2.47,
        totals: {}
      },
      date: 1619118000000,
      dateStr:
        'Thu Apr 22 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Арсенал',
      command_2: 'Евертон',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Arsenal+vs+Everton+-+11143496',
      coeff: {
        w1: 1.89,
        x: 3.9,
        w2: 4.6,
        w1_x: 1.27,
        w1_w2: 1.33,
        w2_x: 2.08,
        totals: {}
      },
      date: 1619204400000,
      dateStr:
        'Fri Apr 23 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Ліверпуль',
      command_2: 'Ньюкасл Юнайтед',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Liverpool+vs+Newcastle+United+-+11143497',
      coeff: {
        w1: 1.28,
        x: 6.15,
        w2: 12.25,
        w1_x: 1.06122,
        w1_w2: 1.16129,
        w2_x: 4.15,
        totals: {}
      },
      date: 1619263800000,
      dateStr:
        'Sat Apr 24 2021 14:30:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Вест Гем Юнайтед',
      command_2: 'Челсі',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/West+Ham+United+vs+Chelsea+-+11143506',
      coeff: {
        w1: 4.8,
        x: 3.88,
        w2: 1.79,
        w1_x: 2.15,
        w1_w2: 1.31,
        w2_x: 1.23,
        totals: {}
      },
      date: 1619281800000,
      dateStr:
        'Sat Apr 24 2021 19:30:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Шеффілд Юнайтед',
      command_2: 'Брайтон енд Гоув Альбіон',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Sheffield+United+vs+Brighton+%26+Hove+Albion+-+11143505',
      coeff: {
        w1: 5.1,
        x: 3.74,
        w2: 1.78,
        w1_x: 2.17,
        w1_w2: 1.33,
        w2_x: 1.21,
        totals: {}
      },
      date: 1619290800000,
      dateStr:
        'Sat Apr 24 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Вулвергемптон Вондерерз',
      command_2: 'Бернлі',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Wolverhampton+Wanderers+vs+Burnley+-+11143503',
      coeff: {
        w1: 2,
        x: 3.48,
        w2: 4.2,
        w1_x: 1.28,
        w1_w2: 1.36,
        w2_x: 1.90909,
        totals: {}
      },
      date: 1619348400000,
      dateStr:
        'Sun Apr 25 2021 14:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Лідс Юнайтед',
      command_2: 'Манчестер Юнайтед',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leeds+United+vs+Manchester+United+-+11143500',
      coeff: {
        w1: 3.88,
        x: 4.05,
        w2: 1.92,
        w1_x: 1.99,
        w1_w2: 1.29,
        w2_x: 1.31,
        totals: {}
      },
      date: 1619355600000,
      dateStr:
        'Sun Apr 25 2021 16:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Астон Вілла',
      command_2: 'Вест Бромвіч Альбіон',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Aston+Villa+vs+West+Bromwich+Albion+-+11143511',
      coeff: {
        w1: 1.81,
        x: 3.85,
        w2: 4.7,
        w1_x: 1.24,
        w1_w2: 1.31,
        w2_x: 2.12,
        totals: {}
      },
      date: 1619373600000,
      dateStr:
        'Sun Apr 25 2021 21:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Лестер Сіті',
      command_2: 'Крістал Пелес',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leicester+City+vs+Crystal+Palace+-+11143501',
      coeff: {
        w1: 1.49,
        x: 4.33333,
        w2: 8.1,
        w1_x: 1.11,
        w1_w2: 1.26,
        w2_x: 2.84,
        totals: {}
      },
      date: 1619463600000,
      dateStr:
        'Mon Apr 26 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Бернлі',
      command_2: 'Вест Гем Юнайтед',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Burnley+vs+West+Ham+United+-+11324304',
      coeff: {
        w1: 3.82,
        x: 3.64,
        w2: 2.05,
        w1_x: 1.87,
        w1_w2: 1.34,
        w2_x: 1.32,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Брайтон енд Гоув Альбіон',
      command_2: 'Лідс Юнайтед',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Brighton+%26+Hove+Albion+vs+Leeds+United+-+11324271',
      coeff: {
        w1: 2.25,
        x: 3.7,
        w2: 3.22,
        w1_x: 1.41,
        w1_w2: 1.33,
        w2_x: 1.72727,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Вест Бромвіч Альбіон',
      command_2: 'Вулвергемптон Вондерерз',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/West+Bromwich+Albion+vs+Wolverhampton+Wanderers+-+11324285',
      coeff: {
        w1: 3.32,
        x: 3.3,
        w2: 2.375,
        w1_x: 1.66,
        w1_w2: 1.39,
        w2_x: 1.39,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Евертон',
      command_2: 'Астон Вілла',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Everton+vs+Aston+Villa+-+11324298',
      coeff: {
        w1: 2.13,
        x: 3.62,
        w2: 3.58,
        w1_x: 1.35,
        w1_w2: 1.34,
        w2_x: 1.81,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Крістал Пелес',
      command_2: 'Манчестер Сіті',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Crystal+Palace+vs+Manchester+City+-+11324274',
      coeff: {
        w1: 8.2,
        x: 4.8,
        w2: 1.44,
        w1_x: 3.04,
        w1_w2: 1.23,
        w2_x: 1.10811,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Манчестер Юнайтед',
      command_2: 'Ліверпуль',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Manchester+United+vs+Liverpool+-+11324273',
      coeff: {
        w1: 2.82,
        x: 3.68,
        w2: 2.51,
        w1_x: 1.6,
        w1_w2: 1.33,
        w2_x: 1.5,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Ньюкасл Юнайтед',
      command_2: 'Арсенал',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Newcastle+United+vs+Arsenal+-+11324272',
      coeff: {
        w1: 4.45,
        x: 3.82,
        w2: 1.86,
        w1_x: 2.06,
        w1_w2: 1.32,
        w2_x: 1.26,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Саутгемптон',
      command_2: 'Лестер Сіті',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Southampton+vs+Leicester+City+-+11324275',
      coeff: {
        w1: 3.98,
        x: 3.76,
        w2: 1.97,
        w1_x: 1.94,
        w1_w2: 1.32,
        w2_x: 1.3,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Тоттенгем Готспур',
      command_2: 'Шеффілд Юнайтед',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Tottenham+Hotspur+vs+Sheffield+United+-+11324284',
      coeff: {
        w1: 1.39,
        x: 5.2,
        w2: 8.8,
        w1_x: 1.09804,
        w1_w2: 1.21,
        w2_x: 3.28,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    },
    {
      command_1: 'Челсі',
      command_2: 'Фулем',
      url:
        'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Chelsea+vs+Fulham+-+11324283',
      coeff: {
        w1: 1.45,
        x: 4.65,
        w2: 8.3,
        w1_x: 1.10714,
        w1_w2: 1.24,
        w2_x: 2.99,
        totals: {}
      },
      date: 1617285600000,
      dateStr:
        'Thu Apr 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 0,
      ref_tournament: '60749ebaf79bbf8fd158c20c'
    }
  ],
  [
    {
      command_1: 'Лидс',
      command_2: 'Ливерпуль',
      date: 1618858800000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31616608/',
      coeff: {
        w1: 5.3,
        x: 4.7,
        w2: 1.58,
        w1_x: 2.41,
        w1_w2: 1.18,
        w2_x: 1.14,
        totals: {
          // '1.5': [5.3, 1.15],
          '1.5': [5.3, 18.15],
          '2.0': [4.4, 18.2],
          // '2.0': [4.4, 1.2],
          '2.5': [2.63, 1.49],
          '3.0': [2.15, 18.76],
          // '3.0': [2.15, 1.76],
          '3.5': [1.68, 2.21],
          '4.0': [1.39, 3],
          '4.5': [1.29, 3.55],
          '5.0': [1.13, 5.6],
          '5.5': [1.11, 6.2],
          '6.0': [1.02, 10]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Челси',
      command_2: 'Брайтон энд Хоув Альбион',
      date: 1618945200000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31617111/',
      coeff: {
        w1: 1.62,
        x: 3.95,
        w2: 6.1,
        w1_x: 1.11,
        w1_w2: 1.24,
        w2_x: 2.33,
        totals: {
          '0.5': [8.1, 1.06],
          '1.0': [6.9, 1.08],
          '1.5': [3.15, 1.35],
          '2.0': [2.46, 1.56],
          '2.5': [1.78, 2.12],
          '3.0': [1.41, 2.93],
          '3.5': [1.29, 3.55],
          '4.0': [1.12, 6],
          '4.5': [1.1, 6.8],
          '5.0': [1.01, 11.5]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Тоттенхэм',
      command_2: 'Саутгемптон',
      date: 1619024400000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841273/',
      coeff: {
        w1: 1.81,
        x: 3.8,
        w2: 4.5,
        w1_x: 1.19,
        w1_w2: 1.25,
        w2_x: 2.01,
        totals: {
          '0.5': [10, 1.03],
          '1.0': [9, 1.04],
          '1.5': [4, 1.24],
          '2.0': [3.15, 1.35],
          '2.5': [2.12, 1.78],
          '3.0': [1.64, 2.27],
          '3.5': [1.45, 2.79],
          '4.0': [1.21, 4.3],
          '4.5': [1.16, 5],
          '5.0': [1.06, 8.4],
          '5.5': [1.05, 9]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Астон Вилла',
      command_2: 'Манчестер Сити',
      date: 1619032500000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841027/',
      coeff: {
        w1: 8.5,
        x: 4.85,
        w2: 1.4,
        w1_x: 2.99,
        w1_w2: 1.17,
        w2_x: 1.05,
        totals: {
          '0.5': [10.5, 1.02],
          '1.0': [9.6, 1.03],
          '1.5': [4.2, 1.22],
          '2.0': [3.35, 1.32],
          '2.5': [2.18, 1.69],
          '3.0': [1.73, 2.19],
          '3.5': [1.48, 2.68],
          '4.0': [1.24, 4],
          '4.5': [1.18, 4.7],
          '5.0': [1.06, 7.9]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Лестер',
      command_2: 'Вест Бромвич',
      date: 1619118000000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841272/',
      coeff: {
        w1: 1.57,
        x: 4.05,
        w2: 5.9,
        w1_x: 1.11,
        w1_w2: 1.22,
        w2_x: 2.37,
        totals: {
          '0.5': [8.9, 1.03],
          '1.0': [7.7, 1.05],
          '1.5': [3.4, 1.29],
          '2.0': [2.69, 19.45],
          // '2.0': [2.69, 1.45],
          '2.5': [1.88, 1.93],
          '3.0': [1.48, 2.6],
          '3.5': [1.32, 3.15],
          '4.0': [1.13, 5.2],
          '4.5': [1.1, 5.9],
          '5.0': [1.01, 10]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Арсенал Лондон',
      command_2: 'Эвертон',
      date: 1619204400000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841282/',
      coeff: {
        w1: 1.8,
        x: 3.65,
        w2: 4.45,
        w1_x: 1.19,
        w1_w2: 1.26,
        w2_x: 1.98,
        totals: {
          '0.5': [8.4, 1.04],
          '1.0': [7.3, 1.06],
          '1.5': [3.25, 1.31],
          '2.0': [2.56, 1.5],
          '2.5': [1.81, 2.01],
          '3.0': [1.44, 2.74],
          '3.5': [1.3, 3.3],
          '4.0': [1.12, 5.5],
          '4.5': [1.09, 6.3],
          '5.0': [1.01, 11]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Ливерпуль',
      command_2: 'Ньюкасл',
      date: 1619263800000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841302/',
      coeff: {
        w1: 1.25,
        x: 5.9,
        w2: 11.5,
        w1_x: 1.02,
        w1_w2: 1.11,
        w2_x: 3.85,
        totals: {
          '1.0': [10.5, 1.01],
          '1.5': [4.5, 1.17],
          '2.0': [3.7, 1.25],
          '2.5': [2.33, 1.58],
          '3.0': [1.86, 1.96],
          '3.5': [1.54, 2.45],
          '4.0': [1.27, 3.5],
          '4.5': [1.2, 4.1],
          '5.0': [1.07, 6.7],
          '5.5': [1.06, 7.3]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Вест Хэм Юнайтед',
      command_2: 'Челси',
      date: 1619281800000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841306/',
      coeff: {
        w1: 4.7,
        x: 3.75,
        w2: 1.74,
        w1_x: 2.06,
        w1_w2: 1.25,
        w2_x: 1.17,
        totals: {
          '0.5': [8.7, 1.04],
          '1.0': [7.6, 1.05],
          '1.5': [3.35, 1.29],
          '2.0': [2.65, 1.47],
          '2.5': [1.86, 1.95],
          '3.0': [1.47, 2.64],
          '3.5': [1.32, 3.2],
          '4.0': [1.13, 5.3],
          '4.5': [1.1, 6],
          '5.0': [1.01, 10.5]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Шеффилд Юнайтед',
      command_2: 'Брайтон энд Хоув Альбион',
      date: 1619290800000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841307/',
      coeff: {
        w1: 5.1,
        x: 3.6,
        w2: 1.73,
        w1_x: 2.08,
        w1_w2: 1.27,
        w2_x: 1.15,
        totals: {
          '0.5': [7.5, 1.05],
          '1.0': [6.4, 1.09],
          '1.5': [3, 1.37],
          '2.0': [2.31, 1.6],
          '2.5': [1.69, 2.19],
          '3.0': [1.35, 3.05],
          '3.5': [1.25, 3.7],
          '4.0': [1.09, 6.5],
          '4.5': [1.06, 7.2]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Вулверхэмптон',
      command_2: 'Бернли',
      date: 1619348400000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841308/',
      coeff: {
        w1: 1.93,
        x: 3.35,
        w2: 4.25,
        w1_x: 1.2,
        w1_w2: 1.3,
        w2_x: 1.85,
        totals: {
          '0.5': [7, 1.07],
          '1.0': [5.8, 1.11],
          '1.5': [2.8, 1.42],
          '2.0': [2.14, 1.72],
          '2.5': [1.59, 2.31],
          '3.0': [1.29, 3.4],
          '3.5': [1.21, 4.1],
          '4.0': [1.06, 7.3],
          '4.5': [1.05, 8.1]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Лидс',
      command_2: 'Манчестер Юнайтед',
      date: 1619355600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841312/',
      coeff: {
        w1: 3.8,
        x: 3.8,
        w2: 1.9,
        w1_x: 1.88,
        w1_w2: 1.24,
        w2_x: 1.24,
        totals: {
          '1.0': [10.5, 1.01],
          '1.5': [4.6, 1.17],
          '2.0': [3.7, 1.25],
          '2.5': [2.32, 1.59],
          '3.0': [1.86, 1.96],
          '3.5': [1.54, 2.43],
          '4.0': [1.27, 3.5],
          '4.5': [1.2, 4.1],
          '5.0': [1.07, 6.7],
          '5.5': [1.06, 7.3]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Астон Вилла',
      command_2: 'Вест Бромвич',
      date: 1619373600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841313/',
      coeff: {
        w1: 1.76,
        x: 3.7,
        w2: 4.65,
        w1_x: 1.17,
        w1_w2: 1.26,
        w2_x: 2.03,
        totals: {
          '0.5': [8.6, 1.04],
          '1.0': [7.5, 1.06],
          '1.5': [3.35, 1.29],
          '2.0': [2.63, 1.47],
          '2.5': [1.84, 1.97],
          '3.0': [1.46, 2.66],
          '3.5': [1.31, 3.25],
          '4.0': [1.12, 5.4],
          '4.5': [1.1, 6.1],
          '5.0': [1.01, 10.5]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Лестер',
      command_2: 'Кристал Пэлас',
      date: 1619463600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841314/',
      coeff: {
        w1: 1.47,
        x: 4.2,
        w2: 7.6,
        w1_x: 1.07,
        w1_w2: 1.21,
        w2_x: 2.66,
        totals: {
          '1.0': [6.9, 1.06],
          '1.5': [3.15, 1.32],
          '2.0': [2.44, 1.52],
          '2.5': [1.77, 2.06],
          '3.0': [1.4, 2.83],
          '3.5': [1.27, 3.45],
          '4.0': [1.1, 5.8],
          '4.5': [1.08, 6.5]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Брайтон энд Хоув Альбион',
      command_2: 'Лидс',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978113/',
      coeff: {
        w1: 2.2,
        x: 3.45,
        w2: 3.25,
        w1_x: 1.32,
        w1_w2: 1.29,
        w2_x: 1.65,
        totals: {
          '1.0': [8.4, 1.03],
          '1.5': [3.8, 1.23],
          '2.0': [3, 1.35],
          '2.5': [2.02, 1.8],
          '3.0': [1.57, 2.3],
          '3.5': [1.4, 2.82],
          '4.0': [1.17, 4.45],
          '4.5': [1.13, 5.1]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Бернли',
      command_2: 'Вест Хэм Юнайтед',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978114/',
      coeff: {
        w1: 3.75,
        x: 3.5,
        w2: 2,
        w1_x: 1.79,
        w1_w2: 1.28,
        w2_x: 1.25,
        totals: {
          '1.0': [7.1, 1.05],
          '1.5': [3.25, 1.3],
          '2.0': [2.52, 1.49],
          '2.5': [1.8, 2.02],
          '3.0': [1.42, 2.73],
          '3.5': [1.29, 3.3],
          '4.0': [1.11, 5.6],
          '4.5': [1.08, 6.3]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Челси',
      command_2: 'Фулхэм',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978127/',
      coeff: {
        w1: 1.43,
        x: 4.4,
        w2: 8.1,
        w1_x: 1.06,
        w1_w2: 1.19,
        w2_x: 2.8,
        totals: {
          '1.0': [7.2, 1.05],
          '1.5': [3.25, 1.3],
          '2.0': [2.53, 1.48],
          '2.5': [1.82, 2],
          '3.0': [1.43, 2.71],
          '3.5': [1.29, 3.3],
          '4.0': [1.11, 5.5],
          '4.5': [1.09, 6.2]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Эвертон',
      command_2: 'Астон Вилла',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978128/',
      coeff: {
        w1: 2.09,
        x: 3.45,
        w2: 3.55,
        w1_x: 1.28,
        w1_w2: 1.29,
        w2_x: 1.72,
        totals: {
          '1.0': [7.5, 1.04],
          '1.5': [3.4, 1.28],
          '2.0': [2.67, 1.44],
          '2.5': [1.87, 1.94],
          '3.0': [1.47, 2.57],
          '3.5': [1.32, 3.1],
          '4.0': [1.13, 5.2],
          '4.5': [1.1, 5.9]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Кристал Пэлас',
      command_2: 'Манчестер Сити',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978129/',
      coeff: {
        w1: 8,
        x: 4.5,
        w2: 1.42,
        w1_x: 2.84,
        w1_w2: 1.19,
        w2_x: 1.06,
        totals: {
          '1.0': [8, 1.03],
          '1.5': [3.55, 1.26],
          '2.0': [2.8, 1.4],
          '2.5': [1.94, 1.87],
          '3.0': [1.51, 2.45],
          '3.5': [1.34, 3],
          '4.0': [1.14, 4.85],
          '4.5': [1.11, 5.5]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Манчестер Юнайтед',
      command_2: 'Ливерпуль',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978131/',
      coeff: {
        w1: 2.77,
        x: 3.4,
        w2: 2.51,
        w1_x: 1.51,
        w1_w2: 1.29,
        w2_x: 1.43,
        totals: {
          '1.5': [3.95, 1.22],
          '2.0': [3.1, 1.33],
          '2.5': [2.07, 1.76],
          '3.0': [1.6, 2.25],
          '3.5': [1.42, 2.75],
          '4.0': [1.18, 4.25],
          '4.5': [1.14, 4.95],
          '5.0': [1.04, 8.3]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Ньюкасл',
      command_2: 'Арсенал Лондон',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978132/',
      coeff: {
        w1: 4.25,
        x: 3.65,
        w2: 1.84,
        w1_x: 1.94,
        w1_w2: 1.26,
        w2_x: 1.2,
        totals: {
          '1.0': [7.6, 1.04],
          '1.5': [3.4, 1.28],
          '2.0': [2.65, 1.44],
          '2.5': [1.87, 1.94],
          '3.0': [1.46, 2.58],
          '3.5': [1.32, 3.15],
          '4.0': [1.13, 5.2],
          '4.5': [1.1, 5.9]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Вест Бромвич',
      command_2: 'Вулверхэмптон',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978133/',
      coeff: {
        w1: 3.25,
        x: 3.2,
        w2: 2.31,
        w1_x: 1.59,
        w1_w2: 1.33,
        w2_x: 1.32,
        totals: {
          '0.5': [6.8, 1.07],
          '1.0': [5.6, 1.11],
          '1.5': [2.73, 1.42],
          '2.0': [2.09, 1.75],
          '2.5': [1.56, 2.33],
          '3.0': [1.27, 3.45],
          '3.5': [1.2, 4.15],
          '4.0': [1.04, 7.5]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Саутгемптон',
      command_2: 'Лестер',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978134/',
      coeff: {
        w1: 4,
        x: 3.55,
        w2: 1.91,
        w1_x: 1.86,
        w1_w2: 1.27,
        w2_x: 1.22,
        totals: {
          '1.0': [7.7, 1.04],
          '1.5': [3.45, 1.27],
          '2.0': [2.72, 1.43],
          '2.5': [1.89, 1.92],
          '3.0': [1.48, 2.53],
          '3.5': [1.33, 3.05],
          '4.0': [1.13, 5],
          '4.5': [1.1, 5.8]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Тоттенхэм',
      command_2: 'Шеффилд Юнайтед',
      date: 1619877600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978135/',
      coeff: {
        w1: 1.37,
        x: 4.9,
        w2: 8.6,
        w1_x: 1.05,
        w1_w2: 1.16,
        w2_x: 3.05,
        totals: {
          '1.5': [4.1, 1.2],
          '2.0': [3.25, 1.3],
          '2.5': [2.14, 1.66],
          '3.0': [1.7, 2.16],
          '3.5': [1.45, 2.63],
          '4.0': [1.21, 3.95],
          '4.5': [1.16, 4.6],
          '5.0': [1.04, 7.7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Брентфорд',
      command_2: 'Кардифф Сити',
      date: 1618938000000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969812/',
      coeff: {
        w1: 1.72,
        x: 3.75,
        w2: 5.3,
        w1_x: 1.14,
        w1_w2: 1.26,
        w2_x: 2.14,
        totals: {
          '1.0': [6.9, 1.08],
          '1.5': [3.15, 1.34],
          '2.0': [2.43, 1.54],
          '2.5': [1.78, 2.12],
          '3.0': [1.4, 2.9],
          '3.5': [1.28, 3.5],
          '4.0': [1.11, 6],
          '4.5': [1.08, 6.7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Норвич Сити',
      command_2: 'Уотфорд',
      date: 1618938000000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969880/',
      coeff: {
        w1: 2.42,
        x: 3.35,
        w2: 3.05,
        w1_x: 1.36,
        w1_w2: 1.31,
        w2_x: 1.56,
        totals: {
          '1.0': [7.6, 1.06],
          '1.5': [3.5, 1.28],
          '2.0': [2.73, 1.44],
          '2.5': [1.9, 1.96],
          '3.0': [1.49, 2.57],
          '3.5': [1.34, 3.1],
          '4.0': [1.14, 5.1],
          '4.5': [1.11, 5.9]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Шеффилд Уэнсдэй',
      command_2: 'Блэкберн Роверс',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969886/',
      coeff: {
        w1: 2.86,
        x: 3.3,
        w2: 2.61,
        w1_x: 1.48,
        w1_w2: 1.32,
        w2_x: 1.41,
        totals: {
          '1.0': [6.5, 1.09],
          '1.5': [3, 1.37],
          '2.0': [2.32, 1.59],
          '2.5': [1.71, 2.21],
          '3.0': [1.35, 3.05],
          '3.5': [1.26, 3.7],
          '4.0': [1.09, 6.5],
          '4.5': [1.07, 7.2]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Престон',
      command_2: 'Дерби',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969887/',
      coeff: {
        w1: 2.61,
        x: 3.25,
        w2: 2.89,
        w1_x: 1.4,
        w1_w2: 1.33,
        w2_x: 1.48,
        totals: {
          '0.5': [7, 1.08],
          '1.0': [5.8, 1.11],
          '1.5': [2.79, 1.43],
          '2.0': [2.16, 1.75],
          '2.5': [1.59, 2.32],
          '3.0': [1.29, 3.4],
          '3.5': [1.21, 4.15],
          '4.0': [1.06, 7.4]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Суонси',
      command_2: 'Куинз Парк Рейнджерс',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969913/',
      coeff: {
        w1: 1.99,
        x: 3.45,
        w2: 4.05,
        w1_x: 1.23,
        w1_w2: 1.29,
        w2_x: 1.82,
        totals: {
          '1.0': [6.9, 1.07],
          '1.5': [3.2, 1.32],
          '2.0': [2.49, 1.52],
          '2.5': [1.8, 2.09],
          '3.0': [1.42, 2.82],
          '3.5': [1.29, 3.4],
          '4.0': [1.11, 5.8],
          '4.5': [1.09, 6.5]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Миллуолл',
      command_2: 'Борнмут',
      date: 1619024400000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969898/',
      coeff: {
        w1: 3.85,
        x: 3.45,
        w2: 2.05,
        w1_x: 1.77,
        w1_w2: 1.29,
        w2_x: 1.25,
        totals: {
          '1.0': [6.6, 1.09],
          '1.5': [3.05, 1.36],
          '2.0': [2.35, 1.58],
          '2.5': [1.73, 2.18],
          '3.0': [1.37, 3],
          '3.5': [1.26, 3.65],
          '4.0': [1.09, 6.3],
          '4.5': [1.07, 7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Ротерем Юнайтед',
      command_2: 'Мидлсбро',
      date: 1619024400000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970068/',
      coeff: {
        w1: 2.84,
        x: 3.25,
        w2: 2.64,
        w1_x: 1.47,
        w1_w2: 1.32,
        w2_x: 1.42,
        totals: {
          '0.5': [7.3, 1.06],
          '1.0': [6.2, 1.1],
          '1.5': [2.96, 1.38],
          '2.0': [2.26, 1.62],
          '2.5': [1.68, 2.27],
          '3.0': [1.34, 3.15],
          '3.5': [1.24, 3.8],
          '4.0': [1.08, 6.8]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Сток Сити',
      command_2: 'Ковентри',
      date: 1619028000000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970161/',
      coeff: {
        w1: 2.2,
        x: 3.3,
        w2: 3.6,
        w1_x: 1.28,
        w1_w2: 1.32,
        w2_x: 1.67,
        totals: {
          '0.5': [6.8, 1.08],
          '1.0': [5.6, 1.12],
          '1.5': [2.74, 1.44],
          '2.0': [2.11, 1.78],
          '2.5': [1.57, 2.37],
          '3.0': [1.28, 3.5],
          '3.5': [1.2, 4.25],
          '4.0': [1.06, 7.7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Уикомб',
      command_2: 'Бристоль Сити',
      date: 1619028000000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970164/',
      coeff: {
        w1: 2.81,
        x: 3.4,
        w2: 2.57,
        w1_x: 1.5,
        w1_w2: 1.3,
        w2_x: 1.42,
        totals: {
          '1.0': [7, 1.07],
          '1.5': [3.15, 1.33],
          '2.0': [2.47, 1.53],
          '2.5': [1.8, 2.09],
          '3.0': [1.41, 2.84],
          '3.5': [1.29, 3.45],
          '4.0': [1.11, 5.9],
          '4.5': [1.09, 6.6]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Хаддерсфилд Таун',
      command_2: 'Барнсли',
      date: 1619030700000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970162/',
      coeff: {
        w1: 3.55,
        x: 3.4,
        w2: 2.16,
        w1_x: 1.69,
        w1_w2: 1.3,
        w2_x: 1.28,
        totals: {
          '1.0': [6.8, 1.08],
          '1.5': [3.15, 1.34],
          '2.0': [2.42, 1.55],
          '2.5': [1.77, 2.13],
          '3.0': [1.39, 2.92],
          '3.5': [1.28, 3.5],
          '4.0': [1.1, 6],
          '4.5': [1.08, 6.8]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Лутон Таун',
      command_2: 'Рединг',
      date: 1619030700000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970163/',
      coeff: {
        w1: 3.1,
        x: 3.35,
        w2: 2.4,
        w1_x: 1.57,
        w1_w2: 1.31,
        w2_x: 1.35,
        totals: {
          '1.0': [6.5, 1.09],
          '1.5': [3, 1.37],
          '2.0': [2.32, 1.59],
          '2.5': [1.72, 2.21],
          '3.0': [1.36, 3.05],
          '3.5': [1.26, 3.7],
          '4.0': [1.09, 6.5],
          '4.5': [1.07, 7.2]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Бирмингем',
      command_2: 'Ноттингем Форест',
      date: 1619030700000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970165/',
      coeff: {
        w1: 2.5,
        x: 3.15,
        w2: 3.1,
        w1_x: 1.35,
        w1_w2: 1.35,
        w2_x: 1.52,
        totals: {
          '0.5': [6.3, 1.1],
          '1.0': [5, 1.15],
          '1.5': [2.55, 1.5],
          '2.0': [1.94, 1.92],
          '2.5': [1.5, 2.54],
          '3.0': [1.23, 3.95],
          '3.5': [1.17, 4.7],
          '4.0': [1.04, 8.7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Брентфорд',
      command_2: 'Ротерем Юнайтед',
      date: 1619546400000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31993992/',
      coeff: {
        w1: 1.43,
        x: 4.5,
        w2: 7.7,
        w1_x: 1.07,
        w1_w2: 1.18,
        w2_x: 2.79,
        totals: {
          '1.5': [3.5, 1.26],
          '2.0': [2.77, 1.41],
          '2.5': [1.93, 1.88],
          '3.0': [1.5, 2.47],
          '3.5': [1.34, 3.05],
          '4.0': [1.14, 4.9]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Суиндон',
      command_2: 'Портсмут',
      date: 1618938000000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970424/',
      coeff: {
        w1: 3.9,
        x: 3.55,
        w2: 1.9,
        w1_x: 1.86,
        w1_w2: 1.27,
        w2_x: 1.23,
        totals: {
          '1.0': [7.8, 1.04],
          '1.5': [3.5, 1.28],
          '2.0': [2.72, 1.42],
          '2.5': [1.89, 1.9],
          '3.0': [1.49, 2.52],
          '3.5': [1.34, 3.1],
          '4.0': [1.13, 5],
          '4.5': [1.1, 5.7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Аккрингтон',
      command_2: 'Донкастер',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970348/',
      coeff: {
        w1: 2.48,
        x: 3.3,
        w2: 2.79,
        w1_x: 1.41,
        w1_w2: 1.3,
        w2_x: 1.51,
        totals: {
          '1.0': [6.9, 1.06],
          '1.5': [3.15, 1.32],
          '2.0': [2.45, 1.51],
          '2.5': [1.76, 2.05],
          '3.0': [1.4, 2.81],
          '3.5': [1.28, 3.45],
          '4.0': [1.1, 5.8],
          '4.5': [1.08, 6.5]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Шрусбери',
      command_2: 'Уиган',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970351/',
      coeff: {
        w1: 2.49,
        x: 3.25,
        w2: 2.84,
        w1_x: 1.4,
        w1_w2: 1.31,
        w2_x: 1.5,
        totals: {
          '1.0': [6.7, 1.06],
          '1.5': [3.15, 1.33],
          '2.0': [2.43, 1.52],
          '2.5': [1.74, 2.08],
          '3.0': [1.39, 2.85],
          '3.5': [1.28, 3.45],
          '4.0': [1.1, 5.9],
          '4.5': [1.08, 6.6]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Бристоль Роверс',
      command_2: 'МК Донс',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970361/',
      coeff: {
        w1: 2.69,
        x: 3.3,
        w2: 2.59,
        w1_x: 1.47,
        w1_w2: 1.31,
        w2_x: 1.44,
        totals: {
          '1.0': [7, 1.06],
          '1.5': [3.2, 1.32],
          '2.0': [2.47, 1.5],
          '2.5': [1.77, 2.04],
          '3.0': [1.41, 2.78],
          '3.5': [1.29, 3.4],
          '4.0': [1.1, 5.7],
          '4.5': [1.08, 6.4]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Рочдейл',
      command_2: 'Блэкпул',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970366/',
      coeff: {
        w1: 4.3,
        x: 3.4,
        w2: 1.87,
        w1_x: 1.89,
        w1_w2: 1.29,
        w2_x: 1.19,
        totals: {
          '1.0': [6.3, 1.08],
          '1.5': [3, 1.36],
          '2.0': [2.29, 1.58],
          '2.5': [1.68, 2.18],
          '3.0': [1.35, 3.05],
          '3.5': [1.25, 3.7],
          '4.0': [1.08, 6.4],
          '4.5': [1.05, 7.1]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Бертон Альбион',
      command_2: 'Линкольн Сити',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970384/',
      coeff: {
        w1: 2.85,
        x: 3.3,
        w2: 2.46,
        w1_x: 1.52,
        w1_w2: 1.31,
        w2_x: 1.4,
        totals: {
          '1.0': [6.7, 1.06],
          '1.5': [3.1, 1.33],
          '2.0': [2.4, 1.53],
          '2.5': [1.73, 2.09],
          '3.0': [1.38, 2.89],
          '3.5': [1.27, 3.5],
          '4.0': [1.09, 6],
          '4.5': [1.07, 6.7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Нортхэмптон',
      command_2: 'Ипсвич',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970387/',
      coeff: {
        w1: 3.1,
        x: 3.05,
        w2: 2.4,
        w1_x: 1.54,
        w1_w2: 1.34,
        w2_x: 1.34,
        totals: {
          '0.5': [6.1, 1.09],
          '1.0': [4.9, 1.14],
          '1.5': [2.47, 1.5],
          '2.0': [1.86, 1.93],
          '2.5': [1.47, 2.56],
          '3.0': [1.21, 4.05],
          '3.5': [1.16, 4.85],
          '4.0': [1.02, 8.9]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Уимблдон',
      command_2: 'Оксфорд Юнайтед',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970407/',
      coeff: {
        w1: 3.15,
        x: 3.4,
        w2: 2.2,
        w1_x: 1.63,
        w1_w2: 1.29,
        w2_x: 1.33,
        totals: {
          '1.0': [8.1, 1.03],
          '1.5': [3.65, 1.26],
          '2.0': [2.85, 1.39],
          '2.5': [1.94, 1.85],
          '3.0': [1.52, 2.42],
          '3.5': [1.36, 2.97],
          '4.0': [1.15, 4.75],
          '4.5': [1.11, 5.4]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Халл',
      command_2: 'Сандерленд',
      date: 1618944300000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970382/',
      coeff: {
        w1: 2.18,
        x: 3.25,
        w2: 3.35,
        w1_x: 1.29,
        w1_w2: 1.32,
        w2_x: 1.65,
        totals: {
          '0.5': [7, 1.07],
          '1.0': [5.7, 1.1],
          '1.5': [2.76, 1.41],
          '2.0': [2.12, 1.72],
          '2.5': [1.57, 2.3],
          '3.0': [1.29, 3.4],
          '3.5': [1.21, 4.1],
          '4.0': [1.05, 7.3]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Флитвуд Таун',
      command_2: 'Крю',
      date: 1618944300000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970398/',
      coeff: {
        w1: 2.18,
        x: 3.3,
        w2: 3.3,
        w1_x: 1.3,
        w1_w2: 1.31,
        w2_x: 1.65,
        totals: {
          '1.0': [6.6, 1.08],
          '1.5': [3.05, 1.34],
          '2.0': [2.35, 1.55],
          '2.5': [1.71, 2.13],
          '3.0': [1.37, 2.96],
          '3.5': [1.26, 3.6],
          '4.0': [1.09, 6.2],
          '4.5': [1.06, 6.8]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Питерборо',
      command_2: 'Джиллингем',
      date: 1618944300000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970416/',
      coeff: {
        w1: 1.6,
        x: 4,
        w2: 5.3,
        w1_x: 1.13,
        w1_w2: 1.22,
        w2_x: 2.27,
        totals: {
          '1.0': [8.6, 1.03],
          '1.5': [3.8, 1.24],
          '2.0': [3, 1.36],
          '2.5': [2.03, 1.78],
          '3.0': [1.58, 2.3],
          '3.5': [1.39, 2.84],
          '4.0': [1.17, 4.4],
          '4.5': [1.13, 5.1]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Плимут',
      command_2: 'Чарльтон Атлетик',
      date: 1618944300000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970422/',
      coeff: {
        w1: 3.7,
        x: 3.55,
        w2: 1.96,
        w1_x: 1.8,
        w1_w2: 1.27,
        w2_x: 1.25,
        totals: {
          '1.0': [7.5, 1.04],
          '1.5': [3.4, 1.29],
          '2.0': [2.64, 1.45],
          '2.5': [1.86, 1.94],
          '3.0': [1.46, 2.59],
          '3.5': [1.32, 3.15],
          '4.0': [1.12, 5.2],
          '4.5': [1.1, 5.9]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Брэдфорд',
      command_2: 'Транмер',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972973/',
      coeff: {
        w1: 2.71,
        x: 3.2,
        w2: 2.63,
        w1_x: 1.46,
        w1_w2: 1.32,
        w2_x: 1.43,
        totals: {
          '1.0': [6.4, 1.08],
          '1.5': [3.05, 1.35],
          '2.0': [2.32, 1.56],
          '2.5': [1.69, 2.15],
          '3.0': [1.36, 3],
          '3.5': [1.26, 3.6],
          '4.0': [1.08, 6.3],
          '4.5': [1.06, 7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Колчестер',
      command_2: 'Саузенд',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972974/',
      coeff: {
        w1: 2.37,
        x: 3.2,
        w2: 3.05,
        w1_x: 1.35,
        w1_w2: 1.32,
        w2_x: 1.55,
        totals: {
          '0.5': [6.8, 1.07],
          '1.0': [5.6, 1.11],
          '1.5': [2.71, 1.43],
          '2.0': [2.07, 1.75],
          '2.5': [1.56, 2.34],
          '3.0': [1.27, 3.5],
          '3.5': [1.2, 4.2],
          '4.0': [1.04, 7.5]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Болтон',
      command_2: 'Карлайл Юнайтед',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972975/',
      coeff: {
        w1: 2.29,
        x: 3.35,
        w2: 3.05,
        w1_x: 1.35,
        w1_w2: 1.3,
        w2_x: 1.59,
        totals: {
          '1.0': [6.8, 1.06],
          '1.5': [3.1, 1.33],
          '2.0': [2.41, 1.53],
          '2.5': [1.74, 2.08],
          '3.0': [1.38, 2.88],
          '3.5': [1.27, 3.5],
          '4.0': [1.1, 5.9],
          '4.5': [1.07, 6.7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Форест Грин',
      command_2: 'Эксетер',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972976/',
      coeff: {
        w1: 2.61,
        x: 3.25,
        w2: 2.68,
        w1_x: 1.44,
        w1_w2: 1.31,
        w2_x: 1.46,
        totals: {
          '1.0': [6.7, 1.06],
          '1.5': [3.15, 1.33],
          '2.0': [2.41, 1.53],
          '2.5': [1.74, 2.08],
          '3.0': [1.39, 2.87],
          '3.5': [1.27, 3.5],
          '4.0': [1.09, 6],
          '4.5': [1.07, 6.7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Лейтон Ориент',
      command_2: 'Кембридж Юнайтед',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972977/',
      coeff: {
        w1: 2.81,
        x: 3.2,
        w2: 2.55,
        w1_x: 1.48,
        w1_w2: 1.32,
        w2_x: 1.41,
        totals: {
          '0.5': [7, 1.07],
          '1.0': [5.8, 1.1],
          '1.5': [2.77, 1.41],
          '2.0': [2.13, 1.71],
          '2.5': [1.58, 2.29],
          '3.0': [1.29, 3.4],
          '3.5': [1.21, 4.1],
          '4.0': [1.05, 7.3]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Мансфилд',
      command_2: 'Сканторп',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972978/',
      coeff: {
        w1: 1.8,
        x: 3.5,
        w2: 4.5,
        w1_x: 1.18,
        w1_w2: 1.28,
        w2_x: 1.96,
        totals: {
          '1.0': [6.6, 1.08],
          '1.5': [3.05, 1.34],
          '2.0': [2.36, 1.55],
          '2.5': [1.72, 2.12],
          '3.0': [1.37, 2.94],
          '3.5': [1.26, 3.55],
          '4.0': [1.09, 6.1],
          '4.5': [1.06, 6.8]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Харрогейт Таун',
      command_2: 'Олдхэм',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972979/',
      coeff: {
        w1: 1.94,
        x: 3.55,
        w2: 3.75,
        w1_x: 1.24,
        w1_w2: 1.27,
        w2_x: 1.82,
        totals: {
          '1.0': [8.1, 1.03],
          '1.5': [3.65, 1.26],
          '2.0': [2.85, 1.39],
          '2.5': [1.95, 1.85],
          '3.0': [1.52, 2.42],
          '3.5': [1.36, 2.97],
          '4.0': [1.15, 4.75],
          '4.5': [1.12, 5.4]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Stevenage',
      command_2: 'Челтенхэм',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972981/',
      coeff: {
        w1: 3.75,
        x: 3.2,
        w2: 2.08,
        w1_x: 1.71,
        w1_w2: 1.32,
        w2_x: 1.25,
        totals: {
          '0.5': [6.6, 1.08],
          '1.0': [5.4, 1.12],
          '1.5': [2.67, 1.44],
          '2.0': [2.03, 1.78],
          '2.5': [1.54, 2.38],
          '3.0': [1.26, 3.6],
          '3.5': [1.19, 4.35],
          '4.0': [1.04, 7.8]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Ньюпорт Каунти',
      command_2: 'Кроули Таун',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972982/',
      coeff: {
        w1: 2.06,
        x: 3.3,
        w2: 3.6,
        w1_x: 1.26,
        w1_w2: 1.3,
        w2_x: 1.72,
        totals: {
          '1.0': [6.3, 1.09],
          '1.5': [2.95, 1.37],
          '2.0': [2.25, 1.6],
          '2.5': [1.66, 2.21],
          '3.0': [1.33, 3.1],
          '3.5': [1.24, 3.8],
          '4.0': [1.08, 6.6],
          '4.5': [1.05, 7.2]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Гримсби Таун',
      command_2: 'Моркам',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972983/',
      coeff: {
        w1: 3.2,
        x: 3.25,
        w2: 2.26,
        w1_x: 1.61,
        w1_w2: 1.32,
        w2_x: 1.32,
        totals: {
          '1.0': [6.4, 1.08],
          '1.5': [3, 1.35],
          '2.0': [2.31, 1.57],
          '2.5': [1.69, 2.16],
          '3.0': [1.35, 3],
          '3.5': [1.25, 3.65],
          '4.0': [1.08, 6.4],
          '4.5': [1.05, 7]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Уолсолл',
      command_2: 'Селфорд Сити',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972984/',
      coeff: {
        w1: 3.5,
        x: 3.2,
        w2: 2.15,
        w1_x: 1.67,
        w1_w2: 1.32,
        w2_x: 1.28,
        totals: {
          '0.5': [7, 1.07],
          '1.0': [5.8, 1.1],
          '1.5': [2.78, 1.41],
          '2.0': [2.14, 1.7],
          '2.5': [1.58, 2.29],
          '3.0': [1.29, 3.35],
          '3.5': [1.21, 4.05],
          '4.0': [1.05, 7.2]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Барроу',
      command_2: 'Порт Вейл',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972985/',
      coeff: {
        w1: 2.65,
        x: 3.2,
        w2: 2.7,
        w1_x: 1.44,
        w1_w2: 1.33,
        w2_x: 1.45,
        totals: {
          '0.5': [7.2, 1.05],
          '1.0': [6.1, 1.09],
          '1.5': [2.9, 1.38],
          '2.0': [2.22, 1.62],
          '2.5': [1.64, 2.25],
          '3.0': [1.32, 3.15],
          '3.5': [1.23, 3.85],
          '4.0': [1.07, 6.8]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Челси',
      command_2: 'Лестер',
      date: 1621104300000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/32015774/',
      coeff: {
        w1: 2.07,
        x: 3.55,
        w2: 3.45,
        w1_x: 1.29,
        w1_w2: 1.28,
        w2_x: 1.73,
        totals: {
          '1.0': [7.8, 1.05],
          '1.5': [3.45, 1.27],
          '2.0': [2.69, 1.43],
          '2.5': [1.89, 1.92],
          '3.0': [1.48, 2.54],
          '3.5': [1.33, 3.1],
          '4.0': [1.13, 5.1],
          '4.5': [1.1, 5.8]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Манчестер Сити',
      command_2: 'Тоттенхэм',
      date: 1619364600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/30223741/',
      coeff: {
        w1: 1.55,
        x: 4.4,
        w2: 6.3,
        w1_x: 1.1,
        w1_w2: 1.2,
        w2_x: 2.5,
        totals: {
          '0.5': [9.5, 1.02],
          '1.0': [8.3, 1.04],
          '1.5': [3.6, 1.26],
          '2.0': [2.85, 1.41],
          '2.5': [2, 1.89],
          '3.0': [1.54, 2.45],
          '3.5': [1.36, 3],
          '4.0': [1.15, 4.8],
          '4.5': [1.12, 5.4],
          '5.0': [1.02, 9.6],
          '5.5': [1.01, 10]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Алдершот',
      command_2: 'Кингс Линн',
      date: 1618941600000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974510/',
      coeff: {
        w1: 1.75,
        x: 3.65,
        w2: 4.25,
        w1_x: 1.17,
        w1_w2: 1.23,
        w2_x: 1.95,
        totals: {
          '2.5': [1.93, 1.75],
          '3.0': [1.51, 2.28]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Уокинг',
      command_2: 'Торки Юнайтед',
      date: 1618944300000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974508/',
      coeff: {
        w1: 4.05,
        x: 3.6,
        w2: 1.8,
        w1_x: 1.89,
        w1_w2: 1.23,
        w2_x: 1.19,
        totals: {
          '2.5': [1.94, 1.74],
          '3.0': [1.52, 2.26]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Борхэм Вуд',
      command_2: 'Барнет',
      date: 1618944300000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974509/',
      coeff: {
        w1: 1.4,
        x: 4.25,
        w2: 7.6,
        w1_x: 1.04,
        w1_w2: 1.17,
        w2_x: 2.72,
        totals: {
          '2.5': [1.79, 1.88],
          '3.0': [1.41, 2.55]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Честерфилд',
      command_2: 'Галифакс Таун',
      date: 1618944300000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974511/',
      coeff: {
        w1: 2.09,
        x: 3.2,
        w2: 3.4,
        w1_x: 1.26,
        w1_w2: 1.29,
        w2_x: 1.65,
        totals: {
          '2.0': [2.27, 1.51],
          '2.5': [1.64, 2.07]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Уэлдстон',
      command_2: 'Мейденхед Юнайтед',
      date: 1618944300000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974512/',
      coeff: {
        w1: 3.15,
        x: 3.55,
        w2: 2.06,
        w1_x: 1.67,
        w1_w2: 1.24,
        w2_x: 1.29,
        totals: {
          '2.5': [2.12, 1.59],
          '3.0': [1.68, 2.03]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Блэкберн Роверс',
      command_2: 'Ливерпуль',
      date: 1618855200000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/32016328/',
      coeff: {
        w1: 1.91,
        x: 3.8,
        w2: 3.45,
        w1_x: 1.26,
        w1_w2: 1.21,
        w2_x: 1.79,
        totals: {
          '2.5': [2.5, 1.43],
          '3.0': [2.07, 1.69],
          '3.5': [1.63, 2.12],
          '4.0': [1.32, 2.85]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/32016452/',
      coeff: {
        w1: 1.97,
        x: 3.9,
        w2: 3.2,
        w1_x: 1.29,
        w1_w2: 1.2,
        w2_x: 1.74,
        totals: {
          '2.5': [2.85, 1.32],
          '3.0': [2.4, 1.5],
          '3.5': [1.86, 1.86],
          '4.0': [1.47, 2.39]
        }
      },
      command_1: 'Лестер Сити',
      command_2: 'Саутгемптон',
      date: 1618855200000,
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    },
    {
      command_1: 'Сток Сити',
      command_2: 'Ньюкасл',
      date: 1618855200000,
      url: 'https://www.favorit.com.ua/ru/sports/event/soccer/32016453/',
      coeff: {
        w1: 1.61,
        x: 4.35,
        w2: 4.45,
        w1_x: 1.16,
        w1_w2: 1.17,
        w2_x: 2.17,
        totals: {
          '2.5': [2.61, 1.4],
          '3.0': [2.14, 1.62],
          '3.5': [1.69, 2.08],
          '4.0': [1.35, 2.71]
        }
      },
      bkId: 2,
      ref_tournament: '60749ebaf79bbf8fd158c291'
    }
  ],
  [
    {
      command_1: 'Лидс',
      command_2: 'Ливерпуль',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '5.50',
        x: '4.70',
        w2: '1.57',
        w1_x: '2.50',
        w1_w2: '1.21',
        w2_x: '1.17',
        totals: {
          '2.0': ['4.60', '1.20'],
          '2.5': ['2.65', '1.48'],
          '3.5': ['1.70', '2.23'],
          '4.0': ['1.38', '3.05'],
          '4.5': ['1.28', '3.70']
        }
      },
      date: 1618858800000,
      dateStr:
        'Mon Apr 19 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Тоттенхэм',
      command_2: 'Саутгемптон',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.81',
        x: '3.80',
        w2: '4.50',
        w1_x: '1.23',
        w1_w2: '1.29',
        w2_x: '2.07',
        totals: {
          '1.5': ['4.00', '1.25'],
          '2.0': ['3.20', '1.35'],
          '3.0': ['1.66', '2.31'],
          '3.5': ['1.42', '2.85'],
          '4.0': ['1.20', '4.60']
        }
      },
      date: 1619024400000,
      dateStr:
        'Wed Apr 21 2021 20:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Лестер',
      command_2: 'Вест Бромвич',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.58',
        x: '4.00',
        w2: '6.00',
        w1_x: '1.13',
        w1_w2: '1.25',
        w2_x: '2.39',
        totals: {
          '1.5': ['3.45', '1.28'],
          '2.0': ['2.70', '1.44'],
          '3.0': ['1.49', '2.60'],
          '3.5': ['1.32', '3.20'],
          '4.0': ['1.14', '5.30']
        }
      },
      date: 1619118000000,
      dateStr:
        'Thu Apr 22 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Ливерпуль',
      command_2: 'Ньюкасл',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.25',
        x: '5.90',
        w2: '11.5',
        w1_x: '1.04',
        w1_w2: '1.13',
        w2_x: '3.95',
        totals: {
          '2.0': ['3.80', '1.25'],
          '2.5': ['2.39', '1.58'],
          '3.5': ['1.53', '2.39'],
          '4.0': ['1.28', '3.50'],
          '4.5': ['1.21', '4.10']
        }
      },
      date: 1619263800000,
      dateStr:
        'Sat Apr 24 2021 14:30:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Шеффилд Юнайтед',
      command_2: 'Брайтон',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '5.10',
        x: '3.60',
        w2: '1.73',
        w1_x: '2.11',
        w1_w2: '1.29',
        w2_x: '1.17',
        totals: {
          '1.5': ['3.00', '1.36'],
          '2.0': ['2.31', '1.61'],
          '3.0': ['1.35', '3.10'],
          '3.5': ['1.23', '3.80'],
          '4.0': ['1.09', '6.70']
        }
      },
      date: 1619290800000,
      dateStr:
        'Sat Apr 24 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Лидс',
      command_2: 'Манчестер Юнайтед',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '3.75',
        x: '3.90',
        w2: '1.88',
        w1_x: '1.92',
        w1_w2: '1.25',
        w2_x: '1.27',
        totals: {
          '2.0': ['3.75', '1.25'],
          '2.5': ['2.37', '1.59'],
          '3.5': ['1.53', '2.41'],
          '4.0': ['1.27', '3.55'],
          '4.5': ['1.21', '4.20']
        }
      },
      date: 1619355600000,
      dateStr:
        'Sun Apr 25 2021 16:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Лестер',
      command_2: 'Кристал Пэлэс',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.47',
        x: '4.20',
        w2: '7.60',
        w1_x: '1.09',
        w1_w2: '1.23',
        w2_x: '2.70',
        totals: {
          '1.5': ['3.15', '1.33'],
          '2.0': ['2.45', '1.55'],
          '3.0': ['1.38', '2.90'],
          '3.5': ['1.27', '3.55'],
          '4.0': ['1.10', '6.20']
        }
      },
      date: 1619463600000,
      dateStr:
        'Mon Apr 26 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Брайтон',
      command_2: 'Лидс',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '2.23',
        x: '3.45',
        w2: '3.20',
        w1_x: '1.35',
        w1_w2: '1.31',
        w2_x: '1.66',
        totals: {
          '1.5': ['3.80', '1.23'],
          '2.0': ['3.00', '1.36'],
          '3.0': ['1.61', '2.33'],
          '3.5': ['1.39', '2.85'],
          '4.0': ['1.18', '4.50']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Кристал Пэлэс',
      command_2: 'Манчестер Сити',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '7.40',
        x: '4.60',
        w2: '1.42',
        w1_x: '2.85',
        w1_w2: '1.20',
        w2_x: '1.09',
        totals: {
          '1.5': ['3.60', '1.27'],
          '2.0': ['2.80', '1.40'],
          '3.0': ['1.53', '2.48'],
          '3.5': ['1.35', '3.05'],
          '4.0': ['1.15', '5.00']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Ньюкасл',
      command_2: 'Арсенал Лондон',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '4.10',
        x: '3.65',
        w2: '1.87',
        w1_x: '1.93',
        w1_w2: '1.28',
        w2_x: '1.23',
        totals: {
          '1.5': ['3.40', '1.29'],
          '2.0': ['2.60', '1.45'],
          '3.0': ['1.47', '2.65'],
          '3.5': ['1.31', '3.25'],
          '4.0': ['1.13', '5.40']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Тоттенхэм',
      command_2: 'Шеффилд Юнайтед',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.37',
        x: '5.10',
        w2: '7.90',
        w1_x: '1.08',
        w1_w2: '1.17',
        w2_x: '3.10',
        totals: {
          '1.5': ['4.20', '1.20'],
          '2.0': ['3.35', '1.29'],
          '2.5': ['2.20', '1.67'],
          '3.5': ['1.45', '2.60'],
          '4.0': ['1.22', '3.95']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Эвертон',
      command_2: 'Астон Вилла',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '2.11',
        x: '3.45',
        w2: '3.45',
        w1_x: '1.31',
        w1_w2: '1.31',
        w2_x: '1.73',
        totals: {
          '1.5': ['3.40', '1.29'],
          '2.0': ['2.60', '1.45'],
          '3.0': ['1.48', '2.65'],
          '3.5': ['1.31', '3.25'],
          '4.0': ['1.13', '5.40']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Челси',
      command_2: 'Брайтон',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.61',
        x: '3.85',
        w2: '6.40',
        w1_x: '1.14',
        w1_w2: '1.29',
        w2_x: '2.41',
        totals: {
          '1.5': ['3.10', '1.37'],
          '2.0': ['2.41', '1.61'],
          '3.0': ['1.38', '3.05'],
          '3.5': ['1.27', '3.80'],
          '4.0': ['1.10', '6.80']
        }
      },
      date: 1618945200000,
      dateStr:
        'Tue Apr 20 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Астон Вилла',
      command_2: 'Манчестер Сити',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '8.60',
        x: '5.00',
        w2: '1.38',
        w1_x: '3.20',
        w1_w2: '1.20',
        w2_x: '1.09',
        totals: {
          '1.5': ['4.40', '1.21'],
          '2.0': ['3.50', '1.31'],
          '2.5': ['2.25', '1.69'],
          '3.5': ['1.47', '2.65'],
          '4.0': ['1.23', '4.10']
        }
      },
      date: 1619032500000,
      dateStr:
        'Wed Apr 21 2021 22:15:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Арсенал Лондон',
      command_2: 'Эвертон',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.81',
        x: '3.75',
        w2: '4.20',
        w1_x: '1.23',
        w1_w2: '1.27',
        w2_x: '2.00',
        totals: {
          '1.5': ['3.25', '1.31'],
          '2.0': ['2.55', '1.52'],
          '3.0': ['1.41', '2.75'],
          '3.5': ['1.29', '3.45'],
          '4.0': ['1.11', '5.80']
        }
      },
      date: 1619204400000,
      dateStr:
        'Fri Apr 23 2021 22:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Вест Хэм',
      command_2: 'Челси',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '4.70',
        x: '3.80',
        w2: '1.73',
        w1_x: '2.11',
        w1_w2: '1.27',
        w2_x: '1.19',
        totals: {
          '1.5': ['3.45', '1.29'],
          '2.0': ['2.65', '1.44'],
          '3.0': ['1.49', '2.65'],
          '3.5': ['1.32', '3.20'],
          '4.0': ['1.13', '5.30']
        }
      },
      date: 1619281800000,
      dateStr:
        'Sat Apr 24 2021 19:30:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Вулверхэмптон',
      command_2: 'Бернли',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.97',
        x: '3.35',
        w2: '4.00',
        w1_x: '1.25',
        w1_w2: '1.33',
        w2_x: '1.83',
        totals: {
          '1.0': ['6.30', '1.10'],
          '1.5': ['2.80', '1.40'],
          '2.5': ['1.64', '2.26'],
          '3.0': ['1.30', '3.35'],
          '3.5': ['1.21', '4.10']
        }
      },
      date: 1619348400000,
      dateStr:
        'Sun Apr 25 2021 14:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Астон Вилла',
      command_2: 'Вест Бромвич',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.80',
        x: '3.80',
        w2: '4.30',
        w1_x: '1.22',
        w1_w2: '1.27',
        w2_x: '2.01',
        totals: {
          '1.5': ['3.30', '1.30'],
          '2.0': ['2.60', '1.49'],
          '3.0': ['1.44', '2.65'],
          '3.5': ['1.30', '3.35'],
          '4.0': ['1.12', '5.60']
        }
      },
      date: 1619373600000,
      dateStr:
        'Sun Apr 25 2021 21:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Бернли',
      command_2: 'Вест Хэм',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '3.70',
        x: '3.45',
        w2: '2.03',
        w1_x: '1.79',
        w1_w2: '1.31',
        w2_x: '1.28',
        totals: {
          '1.5': ['3.25', '1.31'],
          '2.0': ['2.55', '1.51'],
          '3.0': ['1.42', '2.75'],
          '3.5': ['1.29', '3.40'],
          '4.0': ['1.12', '5.80']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Вест Бромвич',
      command_2: 'Вулверхэмптон',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '3.15',
        x: '3.25',
        w2: '2.35',
        w1_x: '1.59',
        w1_w2: '1.35',
        w2_x: '1.36',
        totals: {
          '1.0': ['6.00', '1.11'],
          '1.5': ['2.70', '1.42'],
          '2.5': ['1.60', '2.33'],
          '3.0': ['1.27', '3.50'],
          '3.5': ['1.20', '4.30']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Манчестер Юнайтед',
      command_2: 'Ливерпуль',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '2.75',
        x: '3.45',
        w2: '2.55',
        w1_x: '1.51',
        w1_w2: '1.31',
        w2_x: '1.45',
        totals: {
          '1.5': ['3.90', '1.23'],
          '2.0': ['3.10', '1.35'],
          '3.0': ['1.63', '2.28'],
          '3.5': ['1.40', '2.80'],
          '4.0': ['1.19', '4.40']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Саутгемптон',
      command_2: 'Лестер',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '3.85',
        x: '3.55',
        w2: '1.95',
        w1_x: '1.85',
        w1_w2: '1.30',
        w2_x: '1.27',
        totals: {
          '1.5': ['3.45', '1.28'],
          '2.0': ['2.70', '1.44'],
          '3.0': ['1.50', '2.60'],
          '3.5': ['1.33', '3.20'],
          '4.0': ['1.14', '5.20']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    },
    {
      command_1: 'Челси',
      command_2: 'Фулхэм',
      url: 'https://parimatch.com/sport/futbol/anglija-premer-liga',
      coeff: {
        w1: '1.44',
        x: '4.50',
        w2: '7.50',
        w1_x: '1.09',
        w1_w2: '1.20',
        w2_x: '2.80',
        totals: {
          '1.5': ['3.25', '1.31'],
          '2.0': ['2.55', '1.51'],
          '3.0': ['1.42', '2.75'],
          '3.5': ['1.29', '3.40'],
          '4.0': ['1.12', '5.80']
        }
      },
      date: 1619877600000,
      dateStr:
        'Sat May 01 2021 17:00:00 GMT+0300 (Восточная Европа, летнее время)',
      bkId: 1,
      ref_tournament: '60749ebaf79bbf8fd158c315'
    }
  ]
];

// endParsingBets(f);
