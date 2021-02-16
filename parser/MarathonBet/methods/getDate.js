function getDate(row, item) {
  const monthList = ['cіч', 'лют', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'дек'];
  const elem = row.querySelector('.date');
  const txtArr = elem.innerText.split(' ');
  if (txtArr.length === 0) return;
  const date = new Date();
  date.setMilliseconds(0);
  date.setSeconds(0);
  if (txtArr.length === 1) {
    const hours = txtArr[0].split(':');
    date.setHours(hours[0]);
    date.setMinutes(hours[1]);
    item.date = date.getTime();
  }
  if (txtArr.length === 3) {
    const hours = txtArr[2].split(':');
    date.setHours(hours[0]);
    date.setMinutes(hours[1]);
    date.setDate(txtArr[0]);
    const month = monthList.indexOf(txtArr[1]);
    if (month !== -1) {
      date.setMonth(month);
    }
    item.date = date.getTime();
  }
  item.dateStr = date.toString();
  return item;
}

module.exports = getDate;
