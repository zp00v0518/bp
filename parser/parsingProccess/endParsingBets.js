const insertUnsetCommandsOnDB = require('./insertUnsetCommandsOnDB');

async function endParsingBets(parseEvents) {
  const comandsForSave = [];
  parseEvents.forEach((row) => {
    const x = modifyEventsForSaveCommand(row);
    comandsForSave.push(...x);
  });
  await insertUnsetCommandsOnDB(comandsForSave);
  return comandsForSave;
}

function modifyEventsForSaveCommand(arr) {
  let result = [];
  arr.forEach((ev) => {
    const command_1 = getCommand(ev.command_1, ev);
    const command_2 = getCommand(ev.command_2, ev);
    result.push(command_1, command_2);
  });
  result = result.filter((command, index, arr) => {
    const findIndex = arr.findIndex(
      (elem) => elem.name === command.name || elem.name === command.name
    );
    const flag = findIndex === -1 || !(findIndex < index);
    return flag;
  });
  return result;
}

function getCommand(name, obj) {
  const result = {
    name,
    bkId: obj.bkId,
    ref_tournament: obj.ref_tournament,
    url: obj.url
  };
  return result;
}

module.exports = endParsingBets;
