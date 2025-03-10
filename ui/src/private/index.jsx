import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import useAuth from "@/hooks/useAuth";
import { Auth } from "@/services/auth.service";

export default function Private() {
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, []);

  return isLoading ? <p>Loading...</p> : <Outlet />;
}
