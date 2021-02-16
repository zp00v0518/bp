function createListCommands(arr) {
  const result = {};
  arr.forEach((item) => {
    if (!item.command_1_id) result[item.command_1] = item.command_1;
    if (!item.command_2_id) result[item.command_2] = item.command_2;
  });
  return Object.keys(result);
}

module.exports = createListCommands;
