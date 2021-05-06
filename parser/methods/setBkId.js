// TODO:	провести рефакторинг перевести использование setBkId на этот модуль
function setBkId(arr, id) {
  arr.forEach((item) => {
    item.bk_id = id;
  });
}

module.exports = setBkId;
