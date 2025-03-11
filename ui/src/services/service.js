const BASE_URL = "http://localhost/";

const POST = "POST";
const GET = "GET";

export default service = async (url, method = "GET", body = {}) => {
  const fullUrl = BASE_URL + url;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

const privateService = async (url, method = "GET", token, body = {}) => {
  const fullUrl = BASE_URL + url;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: true,
    body: JSON.stringify(body),
  });

  return response.json();
};

export { GET, POST, privateService };
