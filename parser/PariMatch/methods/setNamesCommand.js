function setNamesCommand(document, item = {}) {
  const commands = document.querySelectorAll('[data-id="prematch-infoboard-competitor"]');
  console.log('commands', commands)
  item.command_1 = commands[0].innerText.trim();
  item.command_2 = commands[1].innerText.trim();
  return item;
}

module.exports = setNamesCommand;
