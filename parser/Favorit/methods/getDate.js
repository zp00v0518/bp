function getDate(eventData, item) {
  item.date = eventData.event_dt * 1000;
  item.dateStr = item.date.toString();
  return item;
}

module.exports = getDate;
