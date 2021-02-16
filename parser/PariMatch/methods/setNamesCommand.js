function setNamesCommand(elem, item = {}) {
  const td = elem.firstChild.querySelector('.l');
  const arr = td.outerText.split('\n');
  item.command_1 = arr[0].trim();
  item.command_2 = arr[1].trim();
  return item;
}

module.exports = setNamesCommand;
