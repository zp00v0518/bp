function getDate(row, item) {
  const tr = row.firstChild;
  const td = tr.children[1];
  const text = td.firstChild.textContent;
  const str = text.replace(/evd/gi,'');
  const arr = str.trim().split(' ');
  const date = arr[0].split('/');
  const time = arr[1].split(':');
  const z = new Date(2000 + +date[2], +date[1]-1, date[0], time[0], time[1]);
  item.date = z.getTime();
  item.dateStr = z.toString();
  return item;
}

module.exports = getDate;
