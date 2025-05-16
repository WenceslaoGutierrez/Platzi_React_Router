import { useRef, type FormEvent } from "react";
import type { BlogDataType } from "../../data/blogData";

interface BlogFormProps {
  initialData?: BlogDataType;
  buttonLabel: string;
  onSubmit: (data: BlogDataType) => void;
  onSwitchTo?: () => void;
}

const BlogForm = ( { initialData, buttonLabel, onSubmit, onSwitchTo }: BlogFormProps ) =>{
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!formRef.current?.reportValidity()) return;

      const formData = new FormData(formRef.current);
      const blog: BlogDataType = {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        content: formData.get("content") as string,
        author: formData.get("author") as string,
      };

      onSubmit(blog);
    };

    return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={initialData?.title || ""}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block font-semibold mb-1">Slug</label>
        <input
          type="text"
          name="slug"
          id="slug"
          required
          defaultValue={initialData?.slug || ""}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="content" className="block font-semibold mb-1">Content</label>
        <textarea
          name="content"
          id="content"
          rows={6}
          required
          defaultValue={initialData?.content || ""}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="author" className="block font-semibold mb-1">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          required
          defaultValue={initialData?.author || ""}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {buttonLabel}
        </button>

        {onSwitchTo && (
          <button
            type="button"
            onClick={onSwitchTo}
            className="text-blue-500 hover:underline text-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BlogForm;