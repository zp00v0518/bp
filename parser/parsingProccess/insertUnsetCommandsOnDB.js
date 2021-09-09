const appConfig = require('../../config');
const InsertDB = require('../../backEnd/db/InsertDB');
const schema = require('../../backEnd/db/schema');
const connectMongoDB = require('../../backEnd/db/connectMongoDB');
const collectionName = appConfig.collections.commands.name;
const dbName = appConfig.db.name;

async function insertUnsetCommandsOnDB(arr = []) {
  if (arr.length === 0) return;
  arr.forEach((item) => {
    item.class = schema.class.command;
  });
  const mongo = new connectMongoDB();
  const insert = new InsertDB(mongo);
  await insert.connect(dbName);
  const insertResult = await insert.many(collectionName, arr);
  insert.close();
  return insertResult;
}

module.exports = insertUnsetCommandsOnDB;

// var t = [
//   {
//     name: 'Лідс Юнайтед',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leeds+United+vs+Liverpool+-+11143498'
//   },
//   {
//     name: 'Ліверпуль',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leeds+United+vs+Liverpool+-+11143498'
//   },
//   {
//     name: 'Челсі',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Chelsea+vs+Brighton+%26+Hove+Albion+-+11324256'
//   },
//   {
//     name: 'Брайтон енд Гоув Альбіон',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Chelsea+vs+Brighton+%26+Hove+Albion+-+11324256'
//   },
//   {
//     name: 'Тоттенгем Готспур',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Tottenham+Hotspur+vs+Southampton+-+11324259'
//   },
//   {
//     name: 'Саутгемптон',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Tottenham+Hotspur+vs+Southampton+-+11324259'
//   },
//   {
//     name: 'Астон Вілла',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Aston+Villa+vs+Manchester+City+-+11324258'
//   },
//   {
//     name: 'Манчестер Сіті',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Aston+Villa+vs+Manchester+City+-+11324258'
//   },
//   {
//     name: 'Лестер Сіті',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leicester+City+vs+West+Bromwich+Albion+-+11324257'
//   },
//   {
//     name: 'Вест Бромвіч Альбіон',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leicester+City+vs+West+Bromwich+Albion+-+11324257'
//   },
//   {
//     name: 'Арсенал',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Arsenal+vs+Everton+-+11143496'
//   },
//   {
//     name: 'Евертон',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Arsenal+vs+Everton+-+11143496'
//   },
//   {
//     name: 'Ньюкасл Юнайтед',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Liverpool+vs+Newcastle+United+-+11143497'
//   },
//   {
//     name: 'Вест Гем Юнайтед',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/West+Ham+United+vs+Chelsea+-+11143506'
//   },
//   {
//     name: 'Шеффілд Юнайтед',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Sheffield+United+vs+Brighton+%26+Hove+Albion+-+11143505'
//   },
//   {
//     name: 'Вулвергемптон Вондерерз',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Wolverhampton+Wanderers+vs+Burnley+-+11143503'
//   },
//   {
//     name: 'Бернлі',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Wolverhampton+Wanderers+vs+Burnley+-+11143503'
//   },
//   {
//     name: 'Манчестер Юнайтед',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leeds+United+vs+Manchester+United+-+11143500'
//   },
//   {
//     name: 'Крістал Пелес',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Leicester+City+vs+Crystal+Palace+-+11143501'
//   },
//   {
//     name: 'Фулем',
//     bkId: 0,
//     ref_tournament: '60749ebaf79bbf8fd158c20c',
//     url:
//       'https://www.marathonbet.com/uk/betting/Football/England/Premier+League/Chelsea+vs+Fulham+-+11324283'
//   },
//   {
//     name: 'Лидс',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31616608/'
//   },
//   {
//     name: 'Ливерпуль',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31616608/'
//   },
//   {
//     name: 'Челси',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31617111/'
//   },
//   {
//     name: 'Брайтон энд Хоув Альбион',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31617111/'
//   },
//   {
//     name: 'Тоттенхэм',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841273/'
//   },
//   {
//     name: 'Саутгемптон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841273/'
//   },
//   {
//     name: 'Астон Вилла',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841027/'
//   },
//   {
//     name: 'Манчестер Сити',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841027/'
//   },
//   {
//     name: 'Лестер',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841272/'
//   },
//   {
//     name: 'Вест Бромвич',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841272/'
//   },
//   {
//     name: 'Арсенал Лондон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841282/'
//   },
//   {
//     name: 'Эвертон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841282/'
//   },
//   {
//     name: 'Ньюкасл',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841302/'
//   },
//   {
//     name: 'Вест Хэм Юнайтед',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841306/'
//   },
//   {
//     name: 'Шеффилд Юнайтед',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841307/'
//   },
//   {
//     name: 'Вулверхэмптон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841308/'
//   },
//   {
//     name: 'Бернли',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841308/'
//   },
//   {
//     name: 'Манчестер Юнайтед',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841312/'
//   },
//   {
//     name: 'Кристал Пэлас',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31841314/'
//   },
//   {
//     name: 'Фулхэм',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31978127/'
//   },
//   {
//     name: 'Брентфорд',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969812/'
//   },
//   {
//     name: 'Кардифф Сити',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969812/'
//   },
//   {
//     name: 'Норвич Сити',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969880/'
//   },
//   {
//     name: 'Уотфорд',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969880/'
//   },
//   {
//     name: 'Шеффилд Уэнсдэй',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969886/'
//   },
//   {
//     name: 'Блэкберн Роверс',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969886/'
//   },
//   {
//     name: 'Престон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969887/'
//   },
//   {
//     name: 'Дерби',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969887/'
//   },
//   {
//     name: 'Суонси',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969913/'
//   },
//   {
//     name: 'Куинз Парк Рейнджерс',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969913/'
//   },
//   {
//     name: 'Миллуолл',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969898/'
//   },
//   {
//     name: 'Борнмут',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31969898/'
//   },
//   {
//     name: 'Ротерем Юнайтед',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970068/'
//   },
//   {
//     name: 'Мидлсбро',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970068/'
//   },
//   {
//     name: 'Сток Сити',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970161/'
//   },
//   {
//     name: 'Ковентри',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970161/'
//   },
//   {
//     name: 'Уикомб',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970164/'
//   },
//   {
//     name: 'Бристоль Сити',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970164/'
//   },
//   {
//     name: 'Хаддерсфилд Таун',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970162/'
//   },
//   {
//     name: 'Барнсли',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970162/'
//   },
//   {
//     name: 'Лутон Таун',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970163/'
//   },
//   {
//     name: 'Рединг',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970163/'
//   },
//   {
//     name: 'Бирмингем',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970165/'
//   },
//   {
//     name: 'Ноттингем Форест',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970165/'
//   },
//   {
//     name: 'Суиндон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970424/'
//   },
//   {
//     name: 'Портсмут',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970424/'
//   },
//   {
//     name: 'Аккрингтон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970348/'
//   },
//   {
//     name: 'Донкастер',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970348/'
//   },
//   {
//     name: 'Шрусбери',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970351/'
//   },
//   {
//     name: 'Уиган',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970351/'
//   },
//   {
//     name: 'Бристоль Роверс',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970361/'
//   },
//   {
//     name: 'МК Донс',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970361/'
//   },
//   {
//     name: 'Рочдейл',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970366/'
//   },
//   {
//     name: 'Блэкпул',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970366/'
//   },
//   {
//     name: 'Бертон Альбион',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970384/'
//   },
//   {
//     name: 'Линкольн Сити',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970384/'
//   },
//   {
//     name: 'Нортхэмптон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970387/'
//   },
//   {
//     name: 'Ипсвич',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970387/'
//   },
//   {
//     name: 'Уимблдон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970407/'
//   },
//   {
//     name: 'Оксфорд Юнайтед',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970407/'
//   },
//   {
//     name: 'Халл',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970382/'
//   },
//   {
//     name: 'Сандерленд',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970382/'
//   },
//   {
//     name: 'Флитвуд Таун',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970398/'
//   },
//   {
//     name: 'Крю',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970398/'
//   },
//   {
//     name: 'Питерборо',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970416/'
//   },
//   {
//     name: 'Джиллингем',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970416/'
//   },
//   {
//     name: 'Плимут',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970422/'
//   },
//   {
//     name: 'Чарльтон Атлетик',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31970422/'
//   },
//   {
//     name: 'Брэдфорд',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972973/'
//   },
//   {
//     name: 'Транмер',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972973/'
//   },
//   {
//     name: 'Колчестер',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972974/'
//   },
//   {
//     name: 'Саузенд',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972974/'
//   },
//   {
//     name: 'Болтон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972975/'
//   },
//   {
//     name: 'Карлайл Юнайтед',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972975/'
//   },
//   {
//     name: 'Форест Грин',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972976/'
//   },
//   {
//     name: 'Эксетер',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972976/'
//   },
//   {
//     name: 'Лейтон Ориент',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972977/'
//   },
//   {
//     name: 'Кембридж Юнайтед',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972977/'
//   },
//   {
//     name: 'Мансфилд',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972978/'
//   },
//   {
//     name: 'Сканторп',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972978/'
//   },
//   {
//     name: 'Харрогейт Таун',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972979/'
//   },
//   {
//     name: 'Олдхэм',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972979/'
//   },
//   {
//     name: 'Стивинэйдж',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972981/'
//   },
//   {
//     name: 'Челтенхэм',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972981/'
//   },
//   {
//     name: 'Ньюпорт Каунти',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972982/'
//   },
//   {
//     name: 'Кроули Таун',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972982/'
//   },
//   {
//     name: 'Гримсби Таун',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972983/'
//   },
//   {
//     name: 'Моркам',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972983/'
//   },
//   {
//     name: 'Уолсолл',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972984/'
//   },
//   {
//     name: 'Селфорд Сити',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972984/'
//   },
//   {
//     name: 'Барроу',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972985/'
//   },
//   {
//     name: 'Порт Вейл',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31972985/'
//   },
//   {
//     name: 'Алдершот',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974510/'
//   },
//   {
//     name: 'Кингс Линн',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974510/'
//   },
//   {
//     name: 'Уокинг',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974508/'
//   },
//   {
//     name: 'Торки Юнайтед',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974508/'
//   },
//   {
//     name: 'Борхэм Вуд',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974509/'
//   },
//   {
//     name: 'Барнет',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974509/'
//   },
//   {
//     name: 'Честерфилд',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974511/'
//   },
//   {
//     name: 'Галифакс Таун',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974511/'
//   },
//   {
//     name: 'Уэлдстон',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974512/'
//   },
//   {
//     name: 'Мейденхед Юнайтед',
//     bkId: 2,
//     ref_tournament: '60749ebaf79bbf8fd158c291',
//     url: 'https://www.favorit.com.ua/ru/sports/event/soccer/31974512/'
//   },
//   {
//     name: 'Лидс',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Ливерпуль',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Тоттенхэм',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Саутгемптон',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Лестер',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Вест Бромвич',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Ньюкасл',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Шеффилд Юнайтед',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Брайтон',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Манчестер Юнайтед',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Кристал Пэлэс',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Манчестер Сити',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Арсенал Лондон',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Эвертон',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Астон Вилла',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Челси',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Вест Хэм',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Вулверхэмптон',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Бернли',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   },
//   {
//     name: 'Фулхэм',
//     bkId: 1,
//     ref_tournament: '60749ebaf79bbf8fd158c315',
//     url: 'https://parimatch.com/sport/futbol/anglija-premer-liga'
//   }
// ];

// insertUnsetCommandsOnDB(t)
