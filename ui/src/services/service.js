const BASE_URL = "http://localhost/";

const POST = "POST";
const GET = "GET";

const service = async (url, method = GET, body = {}) => {
  const fullUrl = BASE_URL + url;

  const options = {};
  options.headers = {
    "Content-Type": "application/json",
  };

  if (method === GET) {
    options.method = method;
  }

  if (method === POST) {
    options.method = method;
    options.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, options);
  return response;
};

const privateService = async (url, method = GET, headers = {}, body = {}) => {
  const fullUrl = BASE_URL + url;

  const options = {};
  options.headers = { "Content-Type": "application/json", ...headers };
  if (method === GET) {
    options.method = method;
  }

  if (method === POST) {
    options.method = method;
    options.body = JSON.stringify(body);
  }

  options.credentials = true;

  const response = await fetch(fullUrl, options);
  return response;
};

export { GET, POST, service, privateService };
