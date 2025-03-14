import { GET, privateService } from "@/services/service";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";

const usePrivateAPI = () => {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    async function refreshToken() {
      try {
        const accessToken = await refresh();
        setAuth((prev) => ({ ...prev, accessToken }));
        console.log("New Access Token After Refresh: ", accessToken);
      } catch (err) {
        console.error(err);
      }
    }

    !auth.accessToken && refreshToken();
  }, [auth, refresh]);

  const privateAPI = async (url, method = GET, body = {}) => {
    return privateService(
      url,
      method,
      {
        Authorization: `Bearer ${auth.accesToken}`,
      },
      body,
    );
  };

  return privateAPI;
};

export default usePrivateAPI;
