const soccer = [];

// const soccer = [
//   'Чемпионат Европы. Групповой этап',
//   'Лига Европы УЕФА. Плей-офф',
//   'Лига наций УЕФА. Лига A',
//   'Чемпионат мира. Квалификация. Европа',
//   'Англия. Премьер-лига',
//   'Англия. Кубок лиги',
//   'Англия. Кубок',
//   'Германия. Бундеслига',
//   'Германия. Кубок',
//   'Испания. Ла-Лига',
//   'Испания. Кубок Короля',
//   'Италия. Серия A',
//   'Италия. Кубок',
//   'Нидерланды. Eredivisie',
//   'Нидерланды. Кубок',
//   'Португалия. Примейра-лига',
//   'Россия. Премьер-лига',
//   'Украина. Премьер-лига',
//   'Украина. Кубок',
//   'Франция. Лига 1',
//   'Казахстан. Премьер-лига',
//   'Кубок Либертадорес',
//   'Австрия. Бундеслига',
//   'Австрия. Лига 2',
//   'Англия. Чемпионшип',
//   'Англия. Лига 1',
//   'Англия. Лига 2',
//   'Англия. ПДЛ',
//   'Англия. Национальная лига',
//   'Бельгия. Первый дивизион A',
//   'Болгария. Первая лига',
//   'Болгария. Кубок',
//   'Болгария. Вторая лига',
//   'Венгрия. Лига NB I',
//   'Венгрия. Кубок',
//   'Германия. Бундеслига 2',
//   'Германия. Региональная лига',
//   'Грузия. Национальная лига 2',
//   'Дания. Суперлига',
//   'Дания. Кубок',
//   'Дания. Первый дивизион',
//   'Дания. Denmark Series',
//   'Ирландия. Премьер-дивизион',
//   'Испания. Сегунда',
//   'Италия. Серия B',
//   'Италия. Серия C',
//   'Италия. Примавера 3',
//   'Кипр. Дивизион 1',
//   'Литва. А Лига',
//   'Польша. Ekstraklasa',
//   'Польша. Лига 1',
//   'Польша. Лига 2',
//   'Польша. Кубок',
//   'Португалия. Сегунда',
//   'Румыния. Кубок',
//   'Румыния. Лига 2',
//   'Северная Ирландия. Премьершип',
//   'Словакия. Суперлига',
//   'Словакия. Кубок',
//   'Словения. Лига 1',
//   'Турция. Суперлига',
//   'Турция. Лига 1',
//   'Уэльс. Премьер-лига',
//   'Фарерские острова. Дивизион 1',
//   'Финляндия. Veikkausliiga',
//   'Франция. Лига 2',
//   'Франция. Национальный дивизион',
//   'Хорватия. Лига 1',
//   'Хорватия. Лига 3',
//   'Чехия. Первая лига',
//   'Чехия. Вторая лига',
//   'Швейцария. Суперлига',
//   'Швеция. Allsvenskan',
//   'Швеция. Superettan',
//   'Швеция. Дивизион 1',
//   'Шотландия. Чемпионшип',
//   'Шотландия. Лига 1',
//   'Шотландия. Лига 2',
//   'Южноамериканский cуперкубок',
//   'Южноамериканский кубок',
//   'Аргентина. Кубок лиги',
//   'Аргентина. Примера B. Насьональ',
//   'Аргентина. Примера B. Метрополитана',
//   'Аргентина. Примера C. Метрополитана',
//   'Боливия. LFPB',
//   'Бразилия. Кубок',
//   'Бразилия. Лига Гояно. Дивизион 1',
//   'Бразилия. Лига Катариненсе',
//   'Бразилия. Лига Паулиста A1',
//   'Бразилия. Лига Сул-Мату-Гроссенсе',
//   'Колумбия. Примера A',
//   'Колумбия. Кубок',
//   'Парагвай. Примера дивизион',
//   'Перу. Примера дивизион',
//   'Чили. Примера дивизион',
//   'Чили. Примера В',
//   'Эквадор. Серия A',
//   'Эквадор. Серия B',
//   'MLS',
//   'Гондурас. Ассенсо лига',
//   'Мексика. Лига MX',
//   'Мексика. Liga de Expansion MX',
//   'Панама. Liga Prom',
//   'США. NISA',
//   'Индонезия. Предсезонный кубок',
//   'Иран. Азадеган лига',
//   'Кувейт. Премьер-лига',
//   'Саудовская Аравия. Про-лига',
//   'Таджикистан. Высшая лига',
//   'Япония. J1-Лига',
//   'Япония. J2-Лига',
//   'Лига чемпионов КОНКАКАФ',
//   'Ангола. Жирабола',
//   'Гамбия. Дивизион 2',
//   'Танзания. Премьер-лига',
//   'Уганда. Премьер-лига',
//   'Эфиопия. Премьер-лига',
//   'Австралия. А-Лига',
//   'Австралия. Кубок ФФА',
//   'Австралия. Брисбен. Премьер-лига',
//   'Австралия. Брисбен. Canale Cup',
//   'Австралия. Квинсленд. Премьер-лига 2',
//   'Женщины. Чемпионат Европы. Квалификация',
//   'Женщины. Олимпийские игры. Квалификация. Азия',
//   'Женщины. Сборные. Товарищеские матчи',
//   'Женщины. Лига чемпионов УЕФА',
//   'Женщины. Австралия. Квинсленд. Национальная Премьер-лига',
//   'Женщины. Панама. Чемпионат',
//   'Женщины. Египет. Премьер-лига'
// ];

module.exports = soccer;
