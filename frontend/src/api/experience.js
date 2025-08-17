const API_URL = import.meta.env.VITE_API_URL;

export const getExperience = async() => {
  const res = await fetch(`${API_URL}/api/company`);
  return res.json()
}