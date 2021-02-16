function deepClone(elem) {
  let result;
  if (Array.isArray(elem)) {
    result = cloneArray(elem, []);
  } else {
    result = cloneObj(elem, {});
  }

  function cloneObj(obj, result) {
    Object.keys(obj).forEach((key) => {
      const item = obj[key];
      if (typeof item !== 'object') {
        result[key] = item;
      } else {
        if (Array.isArray(item)) {
          result[key] = cloneArray(item, result[key]);
        } else {
          result[key] = {};
          cloneObj(item, result[key]);
        }
      }
    });
    return result;
  }
  function cloneArray(arr, result) {
    result = arr.map((item) => {
      if (typeof item !== 'object') {
        return item;
      } else {
        if (Array.isArray(item)) {
          return cloneArray(item, []);
        } else {
          return cloneObj(item, {});
        }
      }
    });
    return result;
  }
  return result;
}

module.exports = deepClone;
