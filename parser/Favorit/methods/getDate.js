function getDate(eventData, item) {
  item.date = eventData.event_dt * 1000;
  return item;
}

module.exports = getDate;
