function sendWSMessage(ws, message) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(message));
    return;
  }
  console.log('Soket is closed');
}

module.exports = sendWSMessage;
