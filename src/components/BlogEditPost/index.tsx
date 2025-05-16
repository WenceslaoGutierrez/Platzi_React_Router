import { useNavigate, useParams } from "react-router-dom";
import { getBlogs, saveBlogs, type BlogDataType } from "../../data/blogData";
import BlogForm from "../BlogForm";
import { useAuth } from "../../hooks";
import { hasPermission } from "../../auth";

const BlogEditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blogs = getBlogs();
  const blogpost = blogs.find((post) => post.slug === slug);

  const { account, signOut } = useAuth();
  const isAuthenticated = !signOut;
  const canEdit = isAuthenticated && hasPermission(account.role, "edit");

  if (!canEdit) return null;

  if (!blogpost) {
    return <p className="text-red-500">Post not found</p>;
  }

  const handleUpdate = (updatedPost: BlogDataType) => {
    const updatedBlogs = blogs.map((b) => (b.slug === slug ? updatedPost : b));

    const slugChanged = slug !== updatedPost.slug;
    const finalBlogs = slugChanged
      ? updatedBlogs.filter((b) => b.slug !== slug)
      : updatedBlogs;

    saveBlogs(finalBlogs);
    navigate(`/blog/${updatedPost.slug}`);
  };

  const handleCancel = () => {
    navigate(`/blog/${slug}`);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md mt-6">
        <h2 className="text-2xl font-bold mb-6">Edit Blog Post</h2>

        <BlogForm
          initialData={blogpost}
          buttonLabel="Save Changes"
          onSubmit={handleUpdate}
          onSwitchTo={handleCancel}
        />
      </div>
    </>
  );
};

export default BlogEditPost;
