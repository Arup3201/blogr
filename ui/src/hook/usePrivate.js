import { useState } from "react";
import { GET, privateService, service } from "@/services/service";
import { useAuth } from "./useAuth";

const MAX_REFRESH = 1;

function usePrivate() {
  const { auth, setAuth, setIsAuthenticated } = useAuth();

  const [attempts, setAttempts] = useState(0);

  async function refresh() {
    const response = await service("/api/auth/refresh");

    if (response.status >= 400) {
      throw Error("Refresh API call failed!");
    }

    const data = await response.json();
    const accessToken = data?.accessToken;
    if (accessToken) {
      return accessToken;
    } else {
      throw Error("Refresh token API returned null!");
    }
  }

  // retry by refreshing the token and calling the private API till maximum attempts are reached
  async function retry(url, method, body) {
    if (attempts < MAX_REFRESH) {
      try {
        const accessToken = await refresh();
        const resp = await privateService(url, accessToken, method, body);
        setAuth({ accessToken });
        setIsAuthenticated(true);
        setAttempts((prev) => prev + 1);
        return resp;
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
      }
    }
    return Promise.reject("Unauthorized!");
  }

  async function privateFetchAPI(url, method = GET, body = {}) {
    try {
      if (!auth.accessToken) {
        return retry(url, method, body);
      }

      const response = await privateService(
        url,
        auth.accessToken,
        method,
        body,
      );

      if (response.status === 403) {
        return retry(url, method, body);
      }

      return response;
    } catch (err) {
      console.log("privateFetchAPI failed!");
      return Promise.reject(err);
    }
  }

  return { privateFetchAPI };
}

export { usePrivate };
