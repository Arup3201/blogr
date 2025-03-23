import { useContext } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";

function Editor() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(auth);

  return (
    <div>
      <header>Account</header>
      <section>
        <ul>
          <li>
            <Button variant="link" onClick={() => navigate("/")}>
              Home
            </Button>
          </li>
          <li>
            <Button variant="link" onClick={() => navigate("/account")}>
              Account
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

export default Editor;
