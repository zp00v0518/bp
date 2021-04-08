function sortArrByField(arr, field = '', order = 'asc') {
  if (!arr || arr.length < 2 || arr[0][field] === undefined) return arr;
  arr.sort((a, b) => {
    if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
    if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
    0;
  });
  return arr;
}

export default sortArrByField;
