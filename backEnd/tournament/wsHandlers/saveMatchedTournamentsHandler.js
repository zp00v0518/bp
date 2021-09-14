const { saveMatchedTournaments, addNewTournamentsOnDB } = require('../db');

// TODO: остановился здесь - на сохранении нового турнира в БД
async function saveMatchedTournamentsHandler(data) {
  const frontData = data.data;
  const newTournaments = getUnsetTours(frontData);
  const dataForSave = getDataForSave(frontData);
  let newTour = [];
  if (Object.keys(newTournaments).length > 0) {
    newTour = await addNewTournamentsOnDB(newTournaments);
  }
  addNewTornamentForSave(dataForSave, newTour, newTournaments);
  const result = await saveMatchedTournaments(dataForSave);
  const message = {
    type: data.type,
    newTour,
    dataForSave,
    newTournaments,
    data: result
  };
  return message;
}

function addNewTornamentForSave(dataForSave, newTour, newTournaments){
  Object.values(newTournaments).forEach(item => {
    const savedTour = newTour.find(i => i.name === item.tournamentName && i.sport_name === item.sportName);
    dataForSave[savedTour._id] = item.tournaments;
  })
};

function getDataForSave(data) {
  const result = {};
  Object.keys(data).forEach((key) => {
    result[key] = data[key].tournaments;
  });
  return result;
}
function getUnsetTours(data) {
  const result = {};
  Object.keys(data).forEach((key) => {
    if (key.includes('NEWTOUR')) {
      result[key] = data[key];
      delete data[key];
    }
  });
  return result;
}

module.exports = saveMatchedTournamentsHandler;
