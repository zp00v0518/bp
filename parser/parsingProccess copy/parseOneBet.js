async function parseOneBet(bet, urls) {
  const result = await bet.parse(urls);
  bet.setBkId(result);
  bet.modifDataToDB(result);
  return result;
};

module.exports = parseOneBet;