const get = async (url, data) => {
  return makeRequest(url, "GET", data);
};

const post = async (url, data) => {
  return makeRequest(url, "POST", data);
};

const makeRequest = async (url, method, body) => {
  const prefixUrl = "http://localhost/";
  const fullUrl = prefixUrl + url;
  console.log(fullUrl);
  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export { post, get };
