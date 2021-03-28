function sortArrByField(arr, field = '') {
  if (!arr || arr.length < 2 || arr[0][field] === undefined) return arr;
  arr.sort((a, b) => {
    if (a[field] > b[field]) return -1;
    if (a[field] < b[field]) return 1;
    0;
  });
  return arr;
}

export default sortArrByField;
