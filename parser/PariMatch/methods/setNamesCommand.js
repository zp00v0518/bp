function setNamesCommand(document, item = {}) {
  const header = document.querySelector('[data-id="event-view-header-soccer"]')
  const arr = header.querySelectorAll('[data-id="prematch-infoboard-competitor"]');
  item.command_1 = arr[0].innerText.trim();
  item.command_2 = arr[1].innerText.trim();
  return item;
}

module.exports = setNamesCommand;
