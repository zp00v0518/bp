function setNamesCommand(evetnData, item) {
  item.command_1 = evetnData.participants[0].participant_name;
  item.command_2 = evetnData.participants[1].participant_name;
  return item;
}

module.exports = setNamesCommand;
