function recursiveLoop(index, arr = [], executeFn, callback = () => {}) {
  if (index === arr.length) {
    callback(null, arr);
    return;
  }
  const event = arr[index];
  executeFn(event).then(() => {
    index++;
    recursiveLoop(index, arr, executeFn, callback);
  });
}

module.exports = recursiveLoop;
