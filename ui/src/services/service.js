const post = async (url, data) => {
  return fetchService(url, "POST", data);
};

const fetchService = async (url, method, body) => {
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

export { post };
