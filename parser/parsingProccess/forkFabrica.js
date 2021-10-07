function forkFabrica(item) {
  const forkItem = {
    commandId_1: item[0].commandId_1.toString(),
    commandId_2: item[0].commandId_2.toString(),
    command_1: item[0].command_1,
    command_2: item[0].command_2,
    // eventId: item._id,
    eventDate: item[0].date,
    created_at: Date.now(),
    fork: []
  };
  if (item._id) {
    forkItem.eventId = item._id;
  }
  return forkItem;
}

module.exports = forkFabrica;
