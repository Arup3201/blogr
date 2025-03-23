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

  try {
    const response = await fetch(fullUrl, options);

    if (response.status >= 400) {
      const data = await response.json();
      return Promise.reject(data.message || "Unexpected API error occured");
    } else {
      return response;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const privateService = async (url, token, method = GET, body = {}) => {
  const fullUrl = BASE_URL + url;

  const options = {};
  options.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  if (method === GET) {
    options.method = method;
  }

  if (method === POST) {
    options.method = method;
    options.body = JSON.stringify(body);
  }

  options.credentials = "include";

  try {
    const response = await fetch(fullUrl, options);
    if (response.status >= 400) {
      const data = await response.json();
      return Promise.reject(data.message || "Unexpected API error occured");
    } else {
      return response;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export { GET, POST, service, privateService };
