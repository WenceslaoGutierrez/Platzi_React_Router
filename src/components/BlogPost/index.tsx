import { useParams } from "react-router-dom";
import { blogData } from "../../data/blogData";

const BlogPost = () => {
    const {slug} = useParams();
    const blogpost = blogData.find(post => post.slug === slug);

    return (
      <>
        <div className="mx-auto p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {blogpost?.title}
          </h2>
          <p className="text-gray-700 mb-6">{blogpost?.content}</p>
          <p className="text-sm text-gray-500 italic">
            Written by {blogpost?.author}
          </p>
        </div>
      </>
    );
}

export default BlogPost;