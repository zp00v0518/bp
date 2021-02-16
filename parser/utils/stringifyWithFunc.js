function stringifyWithFunc(obj) {
  const str = JSON.stringify(obj, function(key, val) {
    if (typeof val === 'function') {
      return val + '';
    }
    return val;
  });
  return str;
}

module.exports = stringifyWithFunc;
