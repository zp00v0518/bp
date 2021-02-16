function setCommandsId(data, fromDB) {
  data.forEach((event) => {
    let id = getCommandId(event.command_1, fromDB);
    if (id) event.command_1_id = id;
    id = getCommandId(event.command_2, fromDB);
    if (id) event.command_2_id = id;
  });
  return data;
  // return data.filter((i) => !!i.command_1_id && !!i.command_2_id);
}

function getCommandId(name = '', fromDB = []) {
  const result = fromDB.find((i) => i.alias.includes(name));
  return result ? result._id : result;
}

module.exports = setCommandsId;
