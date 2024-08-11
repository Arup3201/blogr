const baseURL = "http://127.0.0.1:3000";

export function get(url) {
  const options = {};
  options.method = "GET";
  return createReq(url, options);
}

export function post(url, data) {
  const options = {};
  options.method = "POST";
  options.body = JSON.stringify(data);
  return createReq(url, options);
}

async function createReq(url, options) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
    ...(options.headers || {}),
  };
  options.credentials = "include";
  options.mode = "cors";
  options.headers = headers;

  return await fetch(baseURL + url, options)
    .then((response) => checkError(response))
    .then((response) => {
      return response;
    })
    .catch((err) => err);
}

function checkError(response) {
  if (response.status >= 200 && response.status <= 300) {
    return response.json();
  } else {
    return response.json().then((data) => Promise.reject(data));
  }
}
