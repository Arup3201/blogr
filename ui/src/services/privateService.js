const get = async (url, token, data) => {
  return makeRequest(url, token, "GET", data);
};

const post = async (url, token, data) => {
  return makeRequest(url, token, "POST", data);
};

const makeRequest = async (url, token, method, body) => {
  const prefixUrl = "http://localhost/";
  const fullUrl = prefixUrl + url;

  const response = await fetch(fullUrl, {
    method,
    credentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export { get, post };
