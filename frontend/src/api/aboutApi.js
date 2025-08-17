const API_URL = import.meta.env.VITE_API_URL;

export const getAbout = async() => {
  const res = await fetch(`${API_URL}/api/about`);
  return res.json();
}