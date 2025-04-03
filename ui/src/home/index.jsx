import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Search, Calendar, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      {/* Navigation */}
      <header className="bg-background sticky top-0 z-40 w-full border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">BlogHub</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#"
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
              >
                Categories
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
              >
                Popular
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
              >
                Recent
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search blogs..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" className="hidden md:flex" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex"
              asChild
            >
              <Link href="/editor">Write a Blog</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="container py-4 md:hidden">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search blogs..."
            className="w-full pl-8"
          />
        </div>
      </div>

      <main className="container py-6">
        {/* Featured Post */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Featured Post
          </h2>
          <FeaturedPost />
        </section>

        {/* Recent Posts */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blogs">View all</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </section>

        {/* Popular Categories */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Popular Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Technology
            </Button>
            <Button variant="outline" size="sm">
              Travel
            </Button>
            <Button variant="outline" size="sm">
              Food
            </Button>
            <Button variant="outline" size="sm">
              Health
            </Button>
            <Button variant="outline" size="sm">
              Lifestyle
            </Button>
            <Button variant="outline" size="sm">
              Business
            </Button>
            <Button variant="outline" size="sm">
              Science
            </Button>
            <Button variant="outline" size="sm">
              Art
            </Button>
          </div>
        </section>

        {/* Trending Posts */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/trending">View all</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="text-muted-foreground text-center text-sm leading-loose md:text-left">
            Built with React and shadcn/ui. The source code is available on
            GitHub.
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              About
            </Button>
            <Button variant="ghost" size="sm">
              Contact
            </Button>
            <Button variant="ghost" size="sm">
              Privacy
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BlogCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Link href="/blog/post-slug">
          <div className="relative aspect-video overflow-hidden">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Blog post thumbnail"
              width={600}
              height={400}
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Technology</Badge>
            <div className="text-muted-foreground flex items-center text-xs">
              <Clock className="mr-1 h-3 w-3" />
              <span>5 min read</span>
            </div>
          </div>
          <Link href="/blog/post-slug" className="group">
            <h3 className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
              Understanding React Server Components in Next.js 14
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            Learn how React Server Components work in Next.js 14 and how they
            can improve your application's performance and user experience.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg" alt="Author" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">John Doe</span>
        </div>
        <div className="text-muted-foreground flex items-center text-xs">
          <Calendar className="mr-1 h-3 w-3" />
          <span>Apr 2, 2024</span>
        </div>
      </CardFooter>
    </Card>
  );
}

function FeaturedPost() {
  return (
    <div className="bg-card text-card-foreground overflow-hidden rounded-xl border shadow">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative aspect-video md:aspect-auto">
          <image
            src="/placeholder.svg?height=600&width=800"
            alt="Featured post thumbnail"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>Featured</Badge>
                <Badge variant="secondary">Technology</Badge>
              </div>
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                The Future of Web Development: What to Expect in 2025
              </h3>
              <p className="text-muted-foreground">
                Explore the upcoming trends, technologies, and paradigms that
                will shape the future of web development in the coming year.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Author" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm leading-none font-medium">Jane Smith</p>
                  <p className="text-muted-foreground text-xs">
                    Senior Developer
                  </p>
                </div>
              </div>
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                <span>April 1, 2024</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Clock className="h-3 w-3" />
                <span>10 min read</span>
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full sm:w-auto" asChild>
            <Link href="/blog/featured-post-slug">Read Full Article</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
