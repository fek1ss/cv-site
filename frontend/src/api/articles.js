const API_URL = import.meta.env.VITE_API_URL;

export const getArticles = async() => {
  const res = await fetch(`${API_URL}/api/articles`);
  return res.json();
}