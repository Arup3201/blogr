import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

import { usePrivate } from "@/hook/usePrivate";

function Home() {
  const { privateFetchAPI } = usePrivate();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBlogs() {
      try {
        const response = await privateFetchAPI("/api/private/home/blogs");
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }

    getBlogs();
  }, []);

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
