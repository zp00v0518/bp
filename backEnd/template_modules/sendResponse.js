function sendResponse(
  response,
  data,
  contentType = 'text/plain',
  status = 200
) {
  response.writeHead(status, { 'Content-Type': contentType });
  response.end(data);
}

module.exports = sendResponse;
