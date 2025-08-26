const API_URL = import.meta.env.VITE_API_URL;


export const getHero = async() => {
  const res = await fetch(`${API_URL}/api/hero`);
  return res.json();
}

export const updateHero = async(formData) => {
  try {
    const res = await fetch(`${API_URL}/api/hero/1`,{
      method: 'PATCH',
      body: formData
    });

    if (!res.ok) throw new Error("Something went wrong...");
    
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}