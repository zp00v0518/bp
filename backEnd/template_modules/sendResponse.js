function sendResponse(
  response,
  data,
  contentType = 'text/plain',
  status = 200
) {
  response.writeHead(status, { 'Content-Type': contentType });
  // здесь сериализовать данніе енльзя, т.к. они могут біть уже ввиде строки. Например, файл
  response.end(data);
}

module.exports = sendResponse;
