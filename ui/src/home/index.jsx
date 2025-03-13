import { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import usePrivateAPI from "@/hooks/usePrivate";
import { GET } from "@/services/service";

const SAMPLE_IMAGE =
  "https://lh3.googleusercontent.com/a/ACg8ocKqUa5riQe85OXVIEQxpHkmLVlWrpSZ4JCK4UxgyOubwuRxeb8t=s288-c-no";

const tags = [
  {
    title: "Tech",
    description: "Blah blah blah",
    link: "www.google.com",
  },
  {
    title: "Education",
    description: "Blah blah blah",
    link: "www.google.com",
  },
  {
    title: "Health",
    description: "Blah blah blah",
    link: "www.google.com",
  },
];
const authors = [
  {
    title: "Arup",
    link: "www.google.com",
    image: SAMPLE_IMAGE,
  },
  {
    title: "Arup",
    link: "www.google.com",
    image: SAMPLE_IMAGE,
  },
  {
    title: "Arup",
    link: "www.google.com",
    image: SAMPLE_IMAGE,
  },
  {
    title: "Arup",
    link: "www.google.com",
    image: SAMPLE_IMAGE,
  },
];

function Home() {
  const privateAPI = usePrivateAPI();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      try {
        const response = await privateAPI("/api/private/home/blogs", GET);
        const data = response.json();
        setBlogs(data.blogs);
      } catch (err) {
        console.error(err);
      }
    }

    getBlogs();
  }, []);

  return (
    <>
      <nav>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tags</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {tags.map((tag) => (
                    <li>
                      <a
                        className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                        href={tag.link}
                      >
                        <div className="text-sm leading-none font-medium">
                          {tag.title}
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          {tag.description}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>From top authors</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {authors.map((author) => (
                    <li>
                      <a
                        className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                        href={author.link}
                      >
                        <img src={author.image} />
                        <div className="text-sm leading-none font-medium">
                          {author.title}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <section>
        {blogs.map((blog) => (
          <div>{blog.title}</div>
        ))}
      </section>
    </>
  );
}

export default Home;
