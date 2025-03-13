import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import useRefreshToken from "@/hooks/useRefreshToken";
import useAuth from "@/hooks/useAuth";

export default function Private() {
  const { setAuth } = useAuth();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        const accessToken = await refresh();
        setAuth((prev) => ({ ...prev, accessToken }));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    verifyRefreshToken();
  }, []);

  return isLoading ? <p>Loading...</p> : <Outlet />;
}
