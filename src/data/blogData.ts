export type BlogDataType = {
  title: string;
  slug: string;
  content: string;
  author: string;
};

export const blogData: BlogDataType[] = [
  { title: 'What is react?', slug: 'what-is-react', content: 'Lorem Ipsum', author: 'Fumo' },
  { title: 'What is a framework?', slug: 'what-is-a-framework', content: 'Lorem Ipsum', author: 'Cirno' },
  { title: 'What is a fumo?', slug: 'what-is-a-fumo', content: 'Lorem Ipsum', author: 'Chiruno' },
];

if (!localStorage.getItem("blogs")) {
  localStorage.setItem("blogs", JSON.stringify(blogData));
}

export const getBlogs = (): BlogDataType[] => {
  return JSON.parse(localStorage.getItem("blogs") || "[]");
};

export const saveBlogs = (blogs: BlogDataType[]) => {
  localStorage.setItem("blogs", JSON.stringify(blogs));
};