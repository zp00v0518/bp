const setNewBaseCommand = require('../setNewBaseCommand');
const { setRefinCommand } = require('../db');

async function saveMatchedCommandHandler(data) {
  const message = {
    type: data.type
  };
  try {
    const { commands } = data;
    const unsetCommand = getUnsetCommand(commands);
    if (unsetCommand.length > 0) {
      const result = await setNewBaseCommand(createUnsetCommands(unsetCommand));
      setNewIds(result, unsetCommand);
    }
    const arrCreate = createObjForSetId(commands);
    await setRefinCommand(arrCreate);
    message.status = true;
  } catch (err) {
    console.log(err);
    return;
  }
  return message;
}

function getUnsetCommand(arr) {
  const z = arr.filter((i) => !i._id);
  z.forEach((item) => {
    Object.keys(item.commands).forEach((key) => {
      if (!item.commands[key].value) delete item.commands[key];
    });
  });
  return z;
}

function createUnsetCommands(unsetArr) {
  const z = unsetArr.map((i) => {
    const { name, tournament_type } = i;
    const template = { name, tournament_type };
    return template;
  });
  return z;
}

function setNewIds(newIds, unsetCommand) {
  newIds.forEach((newId) => {
    const command = unsetCommand.find((i) => i.name === newId.name);
    command._id = newId._id;
  });
}

function createObjForSetId(commands) {
  const obj = {};
  commands.forEach((item) => {
    obj[item._id] = Object.values(item.commands).map((i) => i.value);
  });
  return obj;
}

module.exports = saveMatchedCommandHandler;
