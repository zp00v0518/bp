function setDateEvent(document, item) {
  const monthList = [0, 1, 2, 3, 'май', 'июн', 'июл', 'авг', 8, 9, 'нояб.', 'дек'];
  const elDateInfo = document.querySelectorAll(
    '[data-id="prematch-infoboard-time-status"] span'
  )
  if (!elDateInfo || elDateInfo.length !== 2) return;
  const dateArr = elDateInfo[0].innerText.split(' ');
  const date = new Date();
  date.setMilliseconds(0);
  date.setSeconds(0);
  const hours = elDateInfo[1].innerText.split(':');
  date.setHours(hours[0]);
  date.setMinutes(hours[1]);
  date.setDate(dateArr[0]);
  const month = monthList.indexOf(dateArr[1]);
  if (month !== -1) {
    date.setMonth(month);
  }
  item.date = date.getTime();
  item.dateStr = date.toString();
  return item;
}

module.exports = setDateEvent;
