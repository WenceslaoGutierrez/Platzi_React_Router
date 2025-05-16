import { NavLink, Outlet, useLocation } from "react-router-dom";
import { getBlogs, type BlogDataType } from "../../data/blogData";
import { useEffect, useState } from "react";

function BlogLink({ post }: any) {
  return (
    <li>
      <NavLink to={`/blog/${post.slug}`}>{post.title}</NavLink>
    </li>
  );
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogDataType[]>([]);

  const location = useLocation();

  useEffect(() => {
    setBlogs(getBlogs());
  }, [location]);

  return (
    <>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Blog</h1>

        <ul className="space-y-4">
          {blogs.map((post) => (
            <BlogLink key={post.slug} post={post} />
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Blog;
