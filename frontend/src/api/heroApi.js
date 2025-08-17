const API_URL = import.meta.env.VITE_API_URL;


export const getHero = async() => {
  const res = await fetch(`${API_URL}/api/hero`);
  return res.json();
}

// const updateHero = async() => {
  
// }