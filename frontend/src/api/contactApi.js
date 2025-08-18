const API_URL = import.meta.env.VITE_API_URL;

export const getContacts = async() => {
  const res = await fetch(`${API_URL}/api/contact`);
  return res.json();
}