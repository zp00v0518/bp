function splitArrOnSmallArr(urls, size = 3) {
  const workArr = urls.map((i) => i);
  const result = [];
  while (workArr.length) result.push(workArr.splice(0, size));
  return result;
}

module.exports = splitArrOnSmallArr;
