function setNamesCommand(elem, item = {}) {
  const arr = elem.dataset.eventName.split(' - ');
  item.command_1 = arr[0].trim();
  item.command_2 = arr[1].trim();
  return item;
}

module.exports = setNamesCommand;
