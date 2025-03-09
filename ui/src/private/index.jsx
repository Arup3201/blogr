import { useState } from "react";
import { Outlet } from "react-router";

export default function Private() {
  const [isLoading, setIsLoading] = useState();

  return isLoading ? <p>Loading...</p> : <Outlet />;
}
