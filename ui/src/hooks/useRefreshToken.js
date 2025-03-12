import { service, GET } from "@/services/service";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await service("/api/auth/refresh", GET);
      const data = await response.json();
      return Promise.resolve(data.accessToken);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };

  return refresh;
};

export default useRefreshToken;
