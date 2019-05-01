function ApiException(message) {
  this.message = message;
  this.name = 'ApiException';
}
function DOMException(message) {
  this.message = message;
  this.name = 'DOMException';
}

export { ApiException, DOMException };
