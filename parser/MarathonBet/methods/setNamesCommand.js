function setNamesCommand(elem, item = {}) {
  let arr = elem.dataset.eventName.split(' - ');
  if (arr.length < 2) {
    arr = elem.dataset.eventName.split(' @ ');
  }
  if (arr.length < 2) console.log("Марафон, щось знову придумав")
  item.command_1 = arr[0].trim();
  item.command_2 = arr[1].trim();
  return item;
}

module.exports = setNamesCommand;
