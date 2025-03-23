import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "@/context/AuthProvider";
import { privateService } from "@/services/service";
import { Button } from "@/components/ui/button";

function Home() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBlogs() {
      try {
        const response = await privateService(
          "/api/private/home/blogs",
          auth.accessToken,
        );
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    }

    if (auth && auth.accessToken) {
      getBlogs();
    } else {
      console.error("No access token found!");
      navigate("/login");
    }
  }, [auth]);

  return (
    <div>
      <header>Home</header>
      <section>
        <ul>
          <li>
            <Button variant="link" onClick={() => navigate("/account")}>
              Account
            </Button>
          </li>
          <li>
            <Button variant="link" onClick={() => navigate("/editor")}>
              Editor
            </Button>
          </li>
          <li>
            <Button variant="link" onClick={() => navigate("/blog/1")}>
              Blog
            </Button>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
