import { useNavigate, useParams } from "react-router-dom";
import { blogData } from "../../data/blogData";

const BlogEditPost = () =>{
    const { slug } = useParams();
    const navigate = useNavigate();

    const blogpost = blogData.find((post) => post.slug === slug);

    if (!blogpost) {
      return <p className="text-red-500">Post not found</p>;
    }

    const handleSave = () => {
        console.log("Changes saved");
        navigate(`/blog/${slug}`);
    }

    return(<>
    {/* IN PROGRESS*/}
    </>);
}

export default BlogEditPost;