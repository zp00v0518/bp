function parseWithFunction(str) {
  const obj = JSON.parse(str, function(key, val) {
    if (typeof val === 'string' && val.includes('function')) {
      return eval(`(${val})`);
    }
    return val;
  });
  return obj;
}

module.exports = parseWithFunction;
