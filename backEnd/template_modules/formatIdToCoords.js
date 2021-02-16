function formatIdToCoords(id, length) {
  const x = Math.floor(id / length);
  const y = id - x * length;
  return { x, y };
}

module.exports = formatIdToCoords;
