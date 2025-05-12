import { NavLink } from "react-router-dom";
import { blogData } from "../../data/blogData";

function BlogLink({post}:any){
    return (
        <li>
            <NavLink to={`/blog/${post.slug}`}>{post.title}</NavLink>
        </li>
    )
}

const Blog = () =>{

    return (
      <>
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Blog</h1>
          <ul className="space-y-4">
            {blogData.map((post) => (
              <li key={post.slug}>
                <BlogLink post={post} />
              </li>
            ))}
          </ul>
        </div>
      </>
    );
}

export default Blog;