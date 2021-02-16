async function asyncForEach(arr, callback) {
  const result = [];
  for (const item of arr) {
    const r = await callback(item);
    result.push(r);
  }
  return result;
}

module.exports = asyncForEach;
