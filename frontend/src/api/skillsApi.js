const API_URL = import.meta.env.VITE_API_URL;

export const getSkills = async() => {
  const res = await fetch(`${API_URL}/api/skills`);
  return res.json();
}