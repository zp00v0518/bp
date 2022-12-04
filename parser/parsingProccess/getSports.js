const listForParse = require('../parseConfig/listForParse');

async function parseSports() {
  const list = listForParse.flat(Infinity);
  const result = [];
  for (const item of list) {
    try {
      const z = await item.getSports();
      result.push(z);
    } catch (err) {
      console.log(item);
      console.log(err);
    }
  }
  return result;
}
module.exports = parseSports