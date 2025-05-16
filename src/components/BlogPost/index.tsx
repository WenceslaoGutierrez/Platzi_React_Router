import { useNavigate, useParams } from "react-router-dom";
import { blogData } from "../../data/blogData";
import EditButton from "../EditButton";

const BlogPost = () => {
    const {slug} = useParams();
    const blogpost = blogData.find(post => post.slug === slug);
    const navigate = useNavigate();
    
    const returnToBlog = () => navigate('/blog');

    return (
      <>
        <div className="mx-auto p-4 bg-amber-50 shadow-md rounded-md relative">
          <div className="grid grid-cols-12 mb-6">
            <div className="col-span-2">
              <button
                onClick={returnToBlog}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Return to blogs
              </button>
            </div>
            <h2 className="col-span-8 text-center text-2xl font-bold text-gray-800">
              {blogpost?.title}
            </h2>
          </div>
          <p className="text-gray-700 mb-6">{blogpost?.content}</p>
          <p className="text-sm text-gray-500 italic">
            Written by {blogpost?.author}
          </p>
          <EditButton/>
        </div>
      </>
    );
}

export default BlogPost;